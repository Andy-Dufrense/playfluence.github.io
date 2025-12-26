// 主应用程序
class PlayfluenceApp {
    constructor() {
        this.isMobileMenuOpen = false;
        this.scrollPosition = 0;
        this.init();
    }
    
    init() {
        // 等待语言管理器初始化
        this.waitForLanguageManager().then(() => {
            this.setupEventListeners();
            this.setupMobileMenu();
            this.setupSmoothScroll();
            this.setupAnimations();
            this.setupForms();
            this.setupGallery();
            this.setupStickyNavigation();
            
            console.log('PlayfluenceApp initialized');
        }).catch(console.error);
    }
    
    async waitForLanguageManager() {
        // 等待语言管理器初始化
        let attempts = 0;
        while (!window.languageManager?.isInitialized && attempts < 10) {
            await new Promise(resolve => setTimeout(resolve, 100));
            attempts++;
        }
        
        if (!window.languageManager?.isInitialized) {
            console.warn('Language manager not initialized, continuing anyway');
        }
    }
    
    setupEventListeners() {
        // 窗口调整大小时更新
        window.addEventListener('resize', this.handleResize.bind(this));
        
        // 滚动时更新导航
        window.addEventListener('scroll', this.handleScroll.bind(this));
        
        // 语言切换时更新页面
        document.addEventListener('languageChanged', this.handleLanguageChange.bind(this));
        
        // 阻止表单默认提交
        document.addEventListener('submit', (e) => {
            if (e.target.tagName === 'FORM') {
                e.preventDefault();
                this.handleFormSubmit(e.target);
            }
        });
    }
    
    setupMobileMenu() {
        const menuBtn = document.querySelector('.mobile-menu-btn');
        const nav = document.querySelector('.vertical-nav');
        
        if (!menuBtn || !nav) return;
        
        menuBtn.addEventListener('click', () => {
            this.toggleMobileMenu();
        });
        
        // 点击菜单外部关闭
        document.addEventListener('click', (e) => {
            if (this.isMobileMenuOpen && 
                !nav.contains(e.target) && 
                !menuBtn.contains(e.target)) {
                this.closeMobileMenu();
            }
        });
        
        // 点击菜单链接时关闭
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                this.closeMobileMenu();
            });
        });
    }
    
    toggleMobileMenu() {
        const nav = document.querySelector('.vertical-nav');
        const btn = document.querySelector('.mobile-menu-btn');
        
        if (!nav || !btn) return;
        
        this.isMobileMenuOpen = !this.isMobileMenuOpen;
        nav.classList.toggle('active');
        btn.classList.toggle('active');
        
        // 切换图标
        const icon = btn.querySelector('i');
        if (icon) {
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        }
        
        // 防止背景滚动
        document.body.style.overflow = this.isMobileMenuOpen ? 'hidden' : '';
    }
    
    closeMobileMenu() {
        const nav = document.querySelector('.vertical-nav');
        const btn = document.querySelector('.mobile-menu-btn');
        
        if (!nav || !btn || !this.isMobileMenuOpen) return;
        
        this.isMobileMenuOpen = false;
        nav.classList.remove('active');
        btn.classList.remove('active');
        
        const icon = btn.querySelector('i');
        if (icon) {
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-times');
        }
        
        document.body.style.overflow = '';
    }
    
    setupSmoothScroll() {
        // 为所有内部链接添加平滑滚动
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                
                const href = anchor.getAttribute('href');
                if (href === '#') return;
                
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // 更新URL哈希
                    if (history.pushState) {
                        history.pushState(null, null, href);
                    } else {
                        location.hash = href;
                    }
                }
            });
        });
    }
    
    setupAnimations() {
        // 使用Intersection Observer添加滚动动画
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    
                    // 添加延迟动画给子元素
                    const children = entry.target.querySelectorAll('.animate-delay');
                    children.forEach((child, index) => {
                        child.style.animationDelay = `${(index + 1) * 0.1}s`;
                    });
                    
                    // 动画完成后停止观察
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        // 观察所有需要动画的元素
        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            observer.observe(el);
        });
    }
    
    setupForms() {
        // 为所有表单添加验证
        document.querySelectorAll('form').forEach(form => {
            this.setupFormValidation(form);
        });
    }
    
    setupFormValidation(form) {
        const requiredFields = form.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            // 添加实时验证
            field.addEventListener('blur', () => this.validateField(field));
            field.addEventListener('input', () => this.clearFieldError(field));
        });
        
        // 添加提交验证
        form.addEventListener('submit', (e) => {
            if (!this.validateForm(form)) {
                e.preventDefault();
            }
        });
    }
    
    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';
        
        if (field.required && !value) {
            isValid = false;
            errorMessage = window.languageManager?.getTranslation('form_error_required') || 'This field is required';
        } else if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = window.languageManager?.getTranslation('form_error_email') || 'Please enter a valid email address';
            }
        } else if (field.type === 'tel' && value) {
            const phoneRegex = /^[\d\s\-\+\(\)]+$/;
            if (!phoneRegex.test(value)) {
                isValid = false;
                errorMessage = window.languageManager?.getTranslation('form_error_phone') || 'Please enter a valid phone number';
            }
        }
        
        if (!isValid) {
            this.showFieldError(field, errorMessage);
        } else {
            this.clearFieldError(field);
        }
        
        return isValid;
    }
    
    showFieldError(field, message) {
        this.clearFieldError(field);
        
        field.classList.add('error');
        
        const errorElement = document.createElement('div');
        errorElement.className = 'form-error';
        errorElement.textContent = message;
        errorElement.style.cssText = `
            color: var(--secondary-color);
            font-size: 0.875rem;
            margin-top: 0.25rem;
        `;
        
        field.parentNode.appendChild(errorElement);
        
        // 添加ARIA属性
        field.setAttribute('aria-invalid', 'true');
        field.setAttribute('aria-describedby', errorElement.id || `error-${field.name}`);
    }
    
    clearFieldError(field) {
        field.classList.remove('error');
        field.removeAttribute('aria-invalid');
        field.removeAttribute('aria-describedby');
        
        const existingError = field.parentNode.querySelector('.form-error');
        if (existingError) {
            existingError.remove();
        }
    }
    
    validateForm(form) {
        let isValid = true;
        const requiredFields = form.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
                
                // 滚动到第一个错误字段
                if (isValid) {
                    field.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                    });
                    field.focus();
                }
            }
        });
        
        return isValid;
    }
    
    handleFormSubmit(form) {
        if (!this.validateForm(form)) return false;
        
        // 显示加载状态
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<div class="loading"></div>';
        
        // 模拟API调用
        setTimeout(() => {
            // 成功消息
            const successMessage = document.createElement('div');
            successMessage.className = 'form-success';
            successMessage.textContent = window.languageManager?.getTranslation('form_success') || 'Thank you for your message! We will contact you soon.';
            successMessage.style.cssText = `
                background: var(--primary-color);
                color: white;
                padding: 1rem;
                border-radius: var(--radius-md);
                margin-top: 1rem;
                text-align: center;
            `;
            
            form.appendChild(successMessage);
            
            // 重置表单
            form.reset();
            
            // 重置按钮
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
            
            // 移除成功消息
            setTimeout(() => {
                successMessage.remove();
            }, 5000);
        }, 1500);
        
        return false;
    }
    
    setupGallery() {
        // 简单的图库功能
        const galleryItems = document.querySelectorAll('.gallery-item');
        if (galleryItems.length === 0) return;
        
        // 创建模态框
        const modal = this.createGalleryModal();
        
        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                const imgSrc = item.querySelector('img')?.src;
                const caption = item.querySelector('.gallery-caption')?.textContent;
                
                if (imgSrc) {
                    this.openGalleryModal(modal, imgSrc, caption);
                }
            });
        });
    }
    
    createGalleryModal() {
        const modal = document.createElement('div');
        modal.className = 'gallery-modal';
        modal.style.cssText = `
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.9);
            z-index: 2000;
            align-items: center;
            justify-content: center;
            padding: 1rem;
        `;
        
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 90vw; max-height: 90vh;">
                <button class="modal-close" style="
                    position: absolute;
                    top: 1rem;
                    right: 1rem;
                    background: none;
                    border: none;
                    color: white;
                    font-size: 2rem;
                    cursor: pointer;
                    z-index: 2001;
                ">&times;</button>
                <img src="" alt="" style="
                    max-width: 100%;
                    max-height: 100%;
                    object-fit: contain;
                ">
                <div class="modal-caption" style="
                    color: white;
                    text-align: center;
                    margin-top: 1rem;
                    padding: 1rem;
                "></div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // 关闭按钮事件
        const closeBtn = modal.querySelector('.modal-close');
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        });
        
        // 点击背景关闭
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = '';
            }
        });
        
        // ESC键关闭
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.style.display === 'flex') {
                modal.style.display = 'none';
                document.body.style.overflow = '';
            }
        });
        
        return modal;
    }
    
    openGalleryModal(modal, imgSrc, caption) {
        const img = modal.querySelector('img');
        const captionEl = modal.querySelector('.modal-caption');
        
        img.src = imgSrc;
        if (caption) {
            captionEl.textContent = caption;
        } else {
            captionEl.textContent = '';
        }
        
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
    
    setupStickyNavigation() {
        const nav = document.querySelector('.vertical-nav');
        if (!nav) return;
        
        let lastScrollTop = 0;
        const scrollThreshold = 100;
        
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > lastScrollTop && scrollTop > scrollThreshold) {
                // 向下滚动，隐藏导航
                nav.style.transform = 'translateY(-50%) translateX(-20px)';
                nav.style.opacity = '0.5';
            } else {
                // 向上滚动，显示导航
                nav.style.transform = 'translateY(-50%)';
                nav.style.opacity = '1';
            }
            
            lastScrollTop = scrollTop;
        });
    }
    
    handleResize() {
        // 如果屏幕变大，确保移动菜单关闭
        if (window.innerWidth > 768 && this.isMobileMenuOpen) {
            this.closeMobileMenu();
        }
    }
    
    handleScroll() {
        // 更新当前活动导航项
        this.updateActiveNavItem();
    }
    
    updateActiveNavItem() {
        const sections = document.querySelectorAll('section[id]');
        const navItems = document.querySelectorAll('.nav-item');
        
        let currentSection = '';
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            const link = item.querySelector('a');
            const href = link.getAttribute('href');
            
            if (href === `#${currentSection}` || (href === 'index.html' && !currentSection)) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }
    
    handleLanguageChange(event) {
        console.log('Language changed to:', event.detail.language);
        
        // 重新初始化需要语言相关的组件
        this.setupForms();
        
        // 更新图库模态框的关闭按钮文本
        const closeBtn = document.querySelector('.gallery-modal .modal-close');
        if (closeBtn) {
            closeBtn.setAttribute('aria-label', 
                window.languageManager?.getTranslation('modal_close') || 'Close'
            );
        }
    }
}

// 页面加载后初始化应用
document.addEventListener('DOMContentLoaded', () => {
    window.playfluenceApp = new PlayfluenceApp();
});

// 确保所有资源加载完成
window.addEventListener('load', () => {
    // 添加加载完成类
    document.body.classList.add('loaded');
    
    // 移除加载状态
    const loader = document.querySelector('.page-loader');
    if (loader) {
        loader.style.display = 'none';
    }
});