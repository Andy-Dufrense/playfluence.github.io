class BackgroundSlider {
    constructor() {
        this.slider = document.querySelector('.bg-slider');
        if (!this.slider) return;
        
        this.slides = document.querySelectorAll('.bg-slide');
        this.currentIndex = 0;
        this.interval = null;
        this.intervalTime = 5000; // 5秒切换
        this.isPaused = false;
        
        this.init();
    }
    
    init() {
        if (this.slides.length < 2) return;
        
        // 初始化第一张可见
        this.showSlide(0);
        
        // 开始自动切换
        this.start();
        
        // 添加交互控制
        this.addControls();
        
        // 鼠标悬停暂停
        this.slider.addEventListener('mouseenter', () => this.pause());
        this.slider.addEventListener('mouseleave', () => this.resume());
        
        // 触摸设备支持
        this.slider.addEventListener('touchstart', () => this.pause());
        this.slider.addEventListener('touchend', () => this.resume());
        
        // 页面不可见时暂停
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.pause();
            } else {
                this.resume();
            }
        });
    }
    
    showSlide(index) {
        // 确保索引在范围内
        index = (index + this.slides.length) % this.slides.length;
        
        // 隐藏所有幻灯片
        this.slides.forEach((slide, i) => {
            slide.classList.remove('active');
            slide.style.opacity = '0';
            slide.style.zIndex = '1';
        });
        
        // 显示当前幻灯片
        this.slides[index].classList.add('active');
        this.slides[index].style.opacity = '1';
        this.slides[index].style.zIndex = '2';
        
        this.currentIndex = index;
        
        // 更新指示器
        this.updateIndicators();
    }
    
    nextSlide() {
        this.showSlide(this.currentIndex + 1);
    }
    
    prevSlide() {
        this.showSlide(this.currentIndex - 1);
    }
    
    start() {
        if (this.interval) clearInterval(this.interval);
        this.interval = setInterval(() => this.nextSlide(), this.intervalTime);
        this.isPaused = false;
    }
    
    pause() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
            this.isPaused = true;
        }
    }
    
    resume() {
        if (this.isPaused) {
            this.start();
        }
    }
    
    addControls() {
        // 创建指示器
        this.createIndicators();
        
        // 添加上一张/下一张按钮
        this.createNavigationButtons();
    }
    
    createIndicators() {
        const container = document.querySelector('.scroll-indicator') || this.slider;
        const indicatorsContainer = document.createElement('div');
        indicatorsContainer.className = 'bg-indicators';
        
        this.slides.forEach((_, index) => {
            const indicator = document.createElement('button');
            indicator.className = 'bg-indicator';
            indicator.setAttribute('data-slide', index);
            indicator.setAttribute('aria-label', `Go to slide ${index + 1}`);
            
            if (index === 0) {
                indicator.classList.add('active');
            }
            
            indicator.addEventListener('click', () => {
                this.showSlide(index);
                this.start(); // 重置自动切换
            });
            
            indicatorsContainer.appendChild(indicator);
        });
        
        container.appendChild(indicatorsContainer);
    }
    
    updateIndicators() {
        const indicators = document.querySelectorAll('.bg-indicator');
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.currentIndex);
        });
    }
    
    createNavigationButtons() {
        const prevBtn = document.createElement('button');
        prevBtn.className = 'slider-btn slider-prev';
        prevBtn.innerHTML = '&larr;';
        prevBtn.setAttribute('aria-label', 'Previous slide');
        prevBtn.addEventListener('click', () => {
            this.prevSlide();
            this.start();
        });
        
        const nextBtn = document.createElement('button');
        nextBtn.className = 'slider-btn slider-next';
        nextBtn.innerHTML = '&rarr;';
        nextBtn.setAttribute('aria-label', 'Next slide');
        nextBtn.addEventListener('click', () => {
            this.nextSlide();
            this.start();
        });
        
        this.slider.appendChild(prevBtn);
        this.slider.appendChild(nextBtn);
    }
}

// 页面加载后初始化
document.addEventListener('DOMContentLoaded', () => {
    new BackgroundSlider();
    
    // 为指示器添加CSS样式
    const style = document.createElement('style');
    style.textContent = `
        .bg-indicators {
            position: absolute;
            bottom: 60px;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            gap: 10px;
            z-index: 3;
        }
        
        .bg-indicator {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            border: none;
            cursor: pointer;
            transition: all 0.3s ease;
            padding: 0;
        }
        
        .bg-indicator.active,
        .bg-indicator:hover {
            background: white;
            transform: scale(1.2);
        }
        
        .slider-btn {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            background: rgba(255, 255, 255, 0.1);
            border: none;
            color: white;
            font-size: 24px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            cursor: pointer;
            z-index: 3;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
            backdrop-filter: blur(5px);
        }
        
        .slider-btn:hover {
            background: rgba(255, 255, 255, 0.2);
            transform: translateY(-50%) scale(1.1);
        }
        
        .slider-prev {
            left: 20px;
        }
        
        .slider-next {
            right: 20px;
        }
        
        @media (max-width: 768px) {
            .slider-btn {
                width: 40px;
                height: 40px;
                font-size: 20px;
            }
            
            .slider-prev {
                left: 10px;
            }
            
            .slider-next {
                right: 10px;
            }
        }
    `;
    document.head.appendChild(style);
});