// 完整的语言管理系统
class LanguageManager {
    constructor() {
        this.currentLang = 'en';
        this.translations = {};
        this.init();
    }
    
    async init() {
        // 加载翻译文件
        await this.loadTranslations();
        
        // 检查保存的语言偏好
        const savedLang = localStorage.getItem('playfluence_lang');
        if (savedLang && this.translations[savedLang]) {
            this.currentLang = savedLang;
        } else {
            // 根据浏览器语言自动检测
            const browserLang = navigator.language.split('-')[0];
            this.currentLang = this.translations[browserLang] ? browserLang : 'en';
        }
        
        // 应用当前语言
        this.applyLanguage();
        this.setupLanguageSwitcher();
        
        // 监听动态内容变化
        this.setupContentObserver();
    }
    
    async loadTranslations() {
        // 如果无法加载外部文件，使用内联翻译数据
        try {
            const response = await fetch('assets/translations/en.json');
            if (!response.ok) throw new Error('Failed to load translations');
            
            // 实际项目中应该加载所有语言文件
            // 这里为了简化，我们直接定义翻译数据
            this.translations = this.getDefaultTranslations();
        } catch (error) {
            console.warn('Using default translations:', error);
            this.translations = this.getDefaultTranslations();
        }
    }
    
    getDefaultTranslations() {
        return {
            en: {
                // 导航
                "nav_home": "Home",
                "nav_about": "About Us",
                "nav_company": "Company Profile",
                "nav_leadership": "Leadership Team",
                "nav_services": "Our Services",
                "nav_core_services": "Core Services",
                "nav_golden_route": "Golden Route Tour",
                "nav_pricing": "Pricing",
                "nav_insights": "Insights",
                "nav_audience": "Target Audience",
                "nav_edge": "Competitive Edge",
                "nav_trends": "Market Trends",
                "nav_marketing": "Marketing Strategy",
                "nav_partners": "Partnerships",
                "nav_contact": "Contact",
                "nav_sustainability": "Sustainable Future",
                "nav_gallery": "Moments & Gallery",
                
                // 首页
                "hero_title": "Connect. Discover. Cherish",
                "hero_subtitle": "A Discovery Journey with Playfulness",
                "hero_description": "Playfluence is a pioneering recreation marketing company that blends creativity with data intelligence. We craft deeply customized journeys for high-income, multi-generational Chinese families seeking high-quality, edutainment experiences.",
                
                // 公司概况
                "company_mission": "Our Mission",
                "company_mission_text": "To connect people with meaningful recreational experiences by delivering creative, data-driven marketing solutions. We strive to promote zoos, safaris, and theme parks as spaces of learning, adventure, and sustainability.",
                "company_vision": "Our Vision",
                "company_vision_text": "To become China's leading creative marketing company that shapes the future of recreation through innovation, sustainability, and meaningful human connections.",
                "brand_identity": "Brand Identity",
                "logo_rollercoaster": "Roller Coaster - Represents adventure, excitement, and imagination",
                "logo_giraffe": "Giraffe - Symbolizes curiosity, nature, and sustainability",
                "logo_colors": "Colors - Green represents nature & sustainability, Orange represents harmony & energy",
                
                // 领导团队
                "leadership_team": "Leadership Team",
                "leadership_subtitle": "Experts driving innovation in recreation marketing",
                "leadership_roles": "Roles & Responsibilities",
                "leadership_experience": "Experience",
                
                // 服务
                "services_title": "Our Services",
                "services_subtitle": "Comprehensive marketing solutions for recreation industry",
                "service_brand": "Brand & Campaign Design",
                "service_brand_desc": "Craft distinctive visual identities and storytelling-driven promotions for zoos, theme parks, and safaris.",
                "service_digital": "Digital & Social Media Marketing",
                "service_digital_desc": "Utilize data analytics and creative strategies to engage diverse audiences on WeChat, Douyin, Xiaohongshu, and drive visitor growth.",
                "service_analytics": "Visitor Experience Analytics",
                "service_analytics_desc": "Collect and interpret audience behavior data to provide insights that enhance customer satisfaction, loyalty, and return visits.",
                "why_us_title": "Why Playfluence?",
                "why_us_1": "Industry Focus",
                "why_us_1_desc": "We only serve the leisure tourism sector and have a deep understanding of industry trends and tourists' psychology.",
                "why_us_2": "Creativity Powered by Data",
                "why_us_2_desc": "Every creative point is based on solid market and consumer insights.",
                "why_us_3": "End-to-End Solution",
                "why_us_3_desc": "From strategy to execution, we offer one-stop services to ensure the consistency of information and experience.",
                
                // 黄金之旅
                "golden_route_title": "The Golden Route: Generations & Discovery Tour",
                "golden_route_subtitle": "A 10-day luxury experience blending technology, tradition, and family bonding in Japan",
                "tokyo_tech": "Tokyo - Tech & Pop Culture",
                "tokyo_desc": "Miraikan, teamLab Planets, Shibuya Sky, Harajuku. Stay: The Peninsula Tokyo",
                "kyoto_tradition": "Kyoto - Tradition & Heritage",
                "kyoto_desc": "Kinkaku-ji, Arashiyama Bamboo Grove, Fushimi Inari, Private Tea Ceremony. Stay: The Ritz-Carlton, Kyoto",
                "osaka_fun": "Osaka - Fun & Farewell",
                "osaka_desc": "Osaka Castle, Universal Studios Japan, Dotonbori. Stay: InterContinental Osaka",
                
                // 定价
                "pricing_title": "Pricing & Packages",
                "pricing_subtitle": "Investment in unforgettable premium experiences",
                "final_price": "Final Price: USD $6,188 per person",
                "value_proposition": "This is not just a trip; it's a hassle-free investment for premium families. We deliver private, customized, immersive experiences, not standard tours.",
                
                // 目标客群
                "insights_title": "Target Audience Insights",
                "insights_subtitle": "Understanding high-income, multi-generational Chinese families",
                "audience_profile": "Audience Profile",
                "audience_desc": "High-income families from Chinese Tier 1 & 2 cities. Decision-makers are post-80s/90s parents (30-45), with school-age children (6-12) and healthy grandparents (60-75).",
                
                // 竞争优势
                "edge_title": "Competitive Edge",
                "edge_subtitle": "Why Playfluence stands out in recreation marketing",
                "edge_specialists": "Specialists, Not Generalists",
                "edge_specialists_desc": "100% focused on recreation. Our team has hands-on experience from top brands like Chimelong and Disney.",
                "edge_agile": "Agile, Not Rigid",
                "edge_agile_desc": "'Key Consultant + Lean Team' model. Direct access to decision-makers and customized strategies within 24 hours.",
                
                // 市场趋势
                "trends_title": "Market Trends & Insights",
                "trends_subtitle": "Understanding the evolving recreation industry landscape",
                "trend_experience": "Experience Economy",
                "trend_experience_desc": "Shift from goods to immersive, personalized experiences among Chinese consumers.",
                "trend_sustainability": "Sustainability as Baseline",
                "trend_sustainability_desc": "Growing visitor eco-awareness demands demonstrable sustainable practices.",
                
                // 营销策略
                "marketing_title": "Marketing Strategy",
                "marketing_subtitle": "Integrated approach for maximum impact",
                "marketing_theme": "Japan's Timeless Tech & Traditions: A Playfluence Family Journey",
                "wechat_strategy": "WeChat - Trust & Conversion",
                "wechat_strategy_desc": "Publish in-depth articles on safety, 5-star hotels, private guides. Use Mini-programs for consultation.",
                "douyin_strategy": "Douyin - Visual Seeding & Emotion",
                "douyin_strategy_desc": "Share high-impact short videos showcasing elder comfort, children's joy, family moments.",
                
                // 合作伙伴
                "partners_title": "Strategic Partnerships",
                "partners_subtitle": "Collaborating with industry leaders for exceptional experiences",
                "partners_sales": "Sales & Distribution Partners",
                "partners_ground": "Ground Operations Network",
                "partners_experience": "Experience Providers",
                "partners_strategic": "Strategic & Credibility Partners",
                
                // 图库
                "gallery_title": "Moments & Gallery",
                "gallery_subtitle": "Capturing the essence of experiences curated by Playfluence",
                "gallery_family": "Family Joy",
                "gallery_cultural": "Cultural Immersion",
                "gallery_nature": "Nature & Discovery",
                "gallery_events": "Events & Celebrations",
                
                // 可持续未来
                "sustainability_title": "Sustainable Future",
                "sustainability_subtitle": "Leading a Sustainable Future in Recreation",
                "sustainability_commitment": "At Playfluence, we believe true recreation should delight the present and care for the future. Sustainability is not a marketing tag, but the cornerstone of our business logic and creative narrative.",
                "green_destinations": "Empowering Green Destinations",
                "green_destinations_desc": "We prioritize partnerships with zoos holding certifications and theme parks practicing green operations.",
                
                // 联系方式
                "contact_title": "Contact Us",
                "contact_subtitle": "Get in touch with our experts",
                "contact_form_name": "Your Name",
                "contact_form_email": "Your Email",
                "contact_form_phone": "Phone Number",
                "contact_form_wechat": "WeChat ID",
                "contact_form_family": "Family Composition",
                "contact_form_message": "Your Message",
                "contact_form_submit": "Send Message",
                
                // 页脚
                "footer_rights": "© 2023 Playfluence. All rights reserved.",
                "footer_privacy": "Privacy Policy",
                "footer_terms": "Terms of Service",
                
                // 通用
                "cta_book": "Book a Consultation",
                "cta_itinerary": "Get the Itinerary",
                "learn_more": "Learn More",
                "view_details": "View Details",
                "contact_us": "Contact Us",
                "explore_more": "Explore More",
                "download_brochure": "Download Brochure",
                "schedule_call": "Schedule a Call"
            },
            
            zh: {
                // 导航
                "nav_home": "首页",
                "nav_about": "关于我们",
                "nav_company": "公司概况",
                "nav_leadership": "领导团队",
                "nav_services": "我们的服务",
                "nav_core_services": "核心服务",
                "nav_golden_route": "黄金之旅",
                "nav_pricing": "定价",
                "nav_insights": "洞察",
                "nav_audience": "目标客群",
                "nav_edge": "竞争优势",
                "nav_trends": "市场趋势",
                "nav_marketing": "营销策略",
                "nav_partners": "合作伙伴",
                "nav_contact": "联系我们",
                "nav_sustainability": "可持续未来",
                "nav_gallery": "精彩瞬间",
                
                // 首页
                "hero_title": "连接·发现·珍藏",
                "hero_subtitle": "一场充满玩趣的发现之旅",
                "hero_description": "Playfluence是一家开创性的休闲营销公司，将创意与数据智能相结合。我们为寻求高质量寓教于乐体验的高收入、多代同堂中国家庭精心打造深度定制旅程。",
                
                // 公司概况
                "company_mission": "我们的使命",
                "company_mission_text": "通过提供创意、数据驱动的营销解决方案，将人们与有意义的休闲体验连接起来。我们努力将动物园、野生动物园和主题公园推广为学习、冒险和可持续发展的空间。",
                "company_vision": "我们的愿景",
                "company_vision_text": "成为中国领先的创意营销公司，通过创新、可持续发展和有意义的人际联系塑造休闲产业的未来。",
                "brand_identity": "品牌标识",
                "logo_rollercoaster": "过山车 - 代表冒险、刺激和想象力",
                "logo_giraffe": "长颈鹿 - 象征好奇心、自然和可持续性",
                "logo_colors": "色彩 - 绿色代表自然与可持续性，橙色代表和谐与能量",
                
                // 领导团队
                "leadership_team": "领导团队",
                "leadership_subtitle": "推动休闲营销创新的专家",
                "leadership_roles": "角色与职责",
                "leadership_experience": "经验",
                
                // 服务
                "services_title": "我们的服务",
                "services_subtitle": "为休闲产业提供全面的营销解决方案",
                "service_brand": "品牌与活动设计",
                "service_brand_desc": "为动物园、主题公园和野生动物园打造独特的视觉形象和故事驱动的宣传活动。",
                "service_digital": "数字与社交媒体营销",
                "service_digital_desc": "利用数据分析和创意策略，在微信、抖音、小红书等平台吸引多样化受众，推动访客增长。",
                "service_analytics": "访客体验分析",
                "service_analytics_desc": "收集和解读受众行为数据，提供增强客户满意度、忠诚度和重访率的洞察。",
                "why_us_title": "为何选择Playfluence？",
                "why_us_1": "行业专精",
                "why_us_1_desc": "我们只服务于休闲旅游行业，对行业趋势和游客心理有深刻理解。",
                "why_us_2": "创意与数据双驱动",
                "why_us_2_desc": "每个创意点都基于坚实的市场和消费者洞察。",
                "why_us_3": "端到端解决方案",
                "why_us_3_desc": "从战略到执行，我们提供一站式服务，确保信息和体验的一致性。",
                
                // 黄金之旅
                "golden_route_title": "黄金之旅：世代与发现之旅",
                "golden_route_subtitle": "在日本融合科技、传统和家庭情感的10天奢华体验",
                "tokyo_tech": "东京 - 科技与流行文化",
                "tokyo_desc": "未来科学馆、teamLab Planets、涩谷天空、原宿。住宿：东京半岛酒店",
                "kyoto_tradition": "京都 - 传统与文化遗产",
                "kyoto_desc": "金阁寺、岚山竹林、伏见稻荷大社、私人茶道体验。住宿：京都丽思卡尔顿酒店",
                "osaka_fun": "大阪 - 欢乐与告别",
                "osaka_desc": "大阪城、日本环球影城、道顿堀。住宿：大阪洲际酒店",
                
                // 定价
                "pricing_title": "定价与套餐",
                "pricing_subtitle": "投资于难忘的优质体验",
                "final_price": "最终价格：每人6,188美元",
                "value_proposition": "这不仅仅是一次旅行；这是为优质家庭提供的无忧投资。我们提供私密、定制、沉浸式的体验，而非标准旅游产品。",
                
                // 目标客群
                "insights_title": "目标客群洞察",
                "insights_subtitle": "理解高收入、多代同堂中国家庭",
                "audience_profile": "客群画像",
                "audience_desc": "来自中国一二线城市的高收入家庭。决策者为80后/90后父母（30-45岁），有学龄儿童（6-12岁）和健康的祖父母（60-75岁）。",
                
                // 竞争优势
                "edge_title": "竞争优势",
                "edge_subtitle": "Playfluence在休闲营销中的独特之处",
                "edge_specialists": "专家而非通才",
                "edge_specialists_desc": "100%专注于休闲产业。我们的团队拥有来自长隆和迪士尼等顶级品牌的实践经验。",
                "edge_agile": "灵活而非刻板",
                "edge_agile_desc": "'关键顾问+精干团队'模式。24小时内直接接触决策者并提供定制策略。",
                
                // 市场趋势
                "trends_title": "市场趋势与洞察",
                "trends_subtitle": "理解不断演变的休闲产业格局",
                "trend_experience": "体验经济",
                "trend_experience_desc": "中国消费者从商品消费转向沉浸式、个性化体验。",
                "trend_sustainability": "可持续发展成为基准",
                "trend_sustainability_desc": "游客环保意识增强，要求展示可持续实践。",
                
                // 营销策略
                "marketing_title": "营销策略",
                "marketing_subtitle": "实现最大影响力的整合方法",
                "marketing_theme": "日本永恒的科技与传统：Playfluence家庭之旅",
                "wechat_strategy": "微信 - 信任建立与深度转化",
                "wechat_strategy_desc": "发布关于安全、五星级酒店、私人导游的深度文章。使用小程序进行咨询。",
                "douyin_strategy": "抖音 - 视觉种草与情感共鸣",
                "douyin_strategy_desc": "分享展示老人舒适、儿童欢乐、家庭时刻的高影响力短视频。",
                
                // 合作伙伴
                "partners_title": "战略合作伙伴",
                "partners_subtitle": "与行业领导者合作打造卓越体验",
                "partners_sales": "销售与分销合作伙伴",
                "partners_ground": "地面运营网络",
                "partners_experience": "体验内容供应商",
                "partners_strategic": "战略与信誉合作伙伴",
                
                // 图库
                "gallery_title": "精彩瞬间与图库",
                "gallery_subtitle": "捕捉Playfluence策划体验的精髓",
                "gallery_family": "家庭欢乐",
                "gallery_cultural": "文化沉浸",
                "gallery_nature": "自然与发现",
                "gallery_events": "活动与庆典",
                
                // 可持续未来
                "sustainability_title": "可持续未来",
                "sustainability_subtitle": "引领休闲产业的可持续未来",
                "sustainability_commitment": "在Playfluence，我们相信真正的休闲应该愉悦当下、关怀未来。可持续发展不是营销标签，而是我们商业逻辑和创意叙事的基石。",
                "green_destinations": "赋能绿色目的地",
                "green_destinations_desc": "我们优先与持有认证的动物园和实践绿色运营的主题公园合作。",
                
                // 联系方式
                "contact_title": "联系我们",
                "contact_subtitle": "与我们的专家取得联系",
                "contact_form_name": "您的姓名",
                "contact_form_email": "您的邮箱",
                "contact_form_phone": "电话号码",
                "contact_form_wechat": "微信ID",
                "contact_form_family": "家庭构成",
                "contact_form_message": "您的留言",
                "contact_form_submit": "发送消息",
                
                // 页脚
                "footer_rights": "© 2023 Playfluence。保留所有权利。",
                "footer_privacy": "隐私政策",
                "footer_terms": "服务条款",
                
                // 通用
                "cta_book": "预约咨询",
                "cta_itinerary": "获取行程",
                "learn_more": "了解更多",
                "view_details": "查看详情",
                "contact_us": "联系我们",
                "explore_more": "探索更多",
                "download_brochure": "下载手册",
                "schedule_call": "预约通话"
            },
            
            ja: {
                // 导航
                "nav_home": "ホーム",
                "nav_about": "会社概要",
                "nav_company": "会社プロフィール",
                "nav_leadership": "リーダーシップチーム",
                "nav_services": "サービス",
                "nav_core_services": "コアサービス",
                "nav_golden_route": "ゴールデンルートツアー",
                "nav_pricing": "価格",
                "nav_insights": "インサイト",
                "nav_audience": "ターゲット客層",
                "nav_edge": "競争優位性",
                "nav_trends": "市場動向",
                "nav_marketing": "マーケティング戦略",
                "nav_partners": "パートナー",
                "nav_contact": "お問い合わせ",
                "nav_sustainability": "持続可能な未来",
                "nav_gallery": "モーメント＆ギャラリー",
                
                // 首页
                "hero_title": "つながる・発見する・大切にする",
                "hero_subtitle": "遊び心に満ちた発見の旅",
                "hero_description": "Playfluenceは、創造性とデータインテリジェンスを融合させた革新的なレクリエーション・マーケティング会社です。高品質で教育と娯楽を兼ね備えた体験を求める高所得の多世代中国家族のために、深くカスタマイズされた旅を創り出します。",
                
                // 公司概况
                "company_mission": "私たちのミッション",
                "company_mission_text": "創造的でデータ駆動型のマーケティングソリューションを提供することにより、人々を意味のあるレクリエーション体験につなげます。学習、冒険、持続可能性の空間として、動物園、サファリ、テーマパークを推進することに努めています。",
                "company_vision": "私たちのビジョン",
                "company_vision_text": "革新、持続可能性、意味のある人的つながりを通じてレクリエーションの未来を形作る、中国を代表するクリエイティブ・マーケティング企業になること。",
                "brand_identity": "ブランドアイデンティティ",
                "logo_rollercoaster": "ジェットコースター - 冒険と想像力を表す",
                "logo_giraffe": "キリン - 好奇心、自然、持続可能性を象徴する",
                "logo_colors": "色 - 緑は自然と持続可能性を、オレンジは調和とエネルギーを表す",
                
                // 领导团队
                "leadership_team": "リーダーシップチーム",
                "leadership_subtitle": "レクリエーション・マーケティングの革新を推進する専門家",
                "leadership_roles": "役割と責任",
                "leadership_experience": "経験",
                
                // 服务
                "services_title": "当社のサービス",
                "services_subtitle": "レクリエーション産業のための総合的なマーケティングソリューション",
                "service_brand": "ブランド＆キャンペーン設計",
                "service_brand_desc": "動物園、テーマパーク、サファリのために、独特なビジュアルアイデンティティとストーリーテリング主導のプロモーションを創り出します。",
                "service_digital": "デジタル＆ソーシャルメディアマーケティング",
                "service_digital_desc": "データ分析と創造的戦略を活用し、微信、抖音、小紅書などのプラットフォームで多様な観客を惹きつけ、訪問者増加を促進します。",
                "service_analytics": "訪問者体験分析",
                "service_analytics_desc": "観客の行動データを収集・解釈し、顧客満足度、忠誠度、再訪問率を向上させる洞察を提供します。",
                "why_us_title": "なぜPlayfluenceなのか？",
                "why_us_1": "業界特化",
                "why_us_1_desc": "私たちはレジャー旅行業界のみにサービスを提供し、業界の動向と旅行者の心理を深く理解しています。",
                "why_us_2": "データに支えられた創造性",
                "why_us_2_desc": "すべてのクリエイティブなポイントは、確固たる市場と消費者の洞察に基づいています。",
                "why_us_3": "エンドツーエンドソリューション",
                "why_us_3_desc": "戦略から実行まで、ワンストップサービスを提供し、情報と体験の一貫性を確保します。",
                
                // 黄金之旅
                "golden_route_title": "ゴールデンルート：世代と発見の旅",
                "golden_route_subtitle": "日本での技術、伝統、家族の絆を融合した10日間のラグジュアリー体験",
                "tokyo_tech": "東京 - 技術とポップカルチャー",
                "tokyo_desc": "未来館、チームラボプラネッツ、渋谷スカイ、原宿。宿泊：ザ・ペニンシュラ東京",
                "kyoto_tradition": "京都 - 伝統と文化遺産",
                "kyoto_desc": "金閣寺、嵐山竹林、伏見稲荷大社、プライベート茶道体験。宿泊：ザ・リッツ・カールトン京都",
                "osaka_fun": "大阪 - 楽しみと別れ",
                "osaka_desc": "大阪城、ユニバーサル・スタジオ・ジャパン、道頓堀。宿泊：インターコンチネンタル大阪",
                
                // 定价
                "pricing_title": "価格とパッケージ",
                "pricing_subtitle": "忘れられないプレミアム体験への投資",
                "final_price": "最終価格：お一人様6,188米ドル",
                "value_proposition": "これは単なる旅行ではありません。プレミアムファミリーのためのストレスフリーな投資です。私たちは標準的なツアーではなく、プライベートでカスタマイズされた没入型の体験を提供します。",
                
                // 目标客群
                "insights_title": "ターゲット客層インサイト",
                "insights_subtitle": "高所得の多世代中国家族の理解",
                "audience_profile": "客層プロフィール",
                "audience_desc": "中国の一線・二線都市からの高所得家族。意思決定者は80年代・90年代生まれの親（30-45歳）、学齢期の子供（6-12歳）、健康な祖父母（60-75歳）がいます。",
                
                // 竞争优势
                "edge_title": "競争優位性",
                "edge_subtitle": "Playfluenceがレクリエーション・マーケティングで際立つ理由",
                "edge_specialists": "スペシャリストであり、ゼネラリストではない",
                "edge_specialists_desc": "100％レクリエーションに特化。私たちのチームは、長隆やディズニーなどのトップブランドでの実践的な経験を持っています。",
                "edge_agile": "アジャイルであり、硬直的ではない",
                "edge_agile_desc": "'キーコンサルタント＋リーンチーム'モデル。24時間以内に意思決定者に直接アクセスし、カスタマイズされた戦略を提供。",
                
                // 市场趋势
                "trends_title": "市場動向とインサイト",
                "trends_subtitle": "進化するレクリエーション産業の状況を理解",
                "trend_experience": "体験経済",
                "trend_experience_desc": "中国の消費者における商品から没入型でパーソナライズされた体験へのシフト。",
                "trend_sustainability": "持続可能性をベースラインとして",
                "trend_sustainability_desc": "観光客のエコ意識の高まりにより、実証可能な持続可能な実践が要求される。",
                
                // 营销策略
                "marketing_title": "マーケティング戦略",
                "marketing_subtitle": "最大限の影響力を持つ統合アプローチ",
                "marketing_theme": "日本の永遠の技術と伝統：Playfluenceファミリージャーニー",
                "wechat_strategy": "微信 - 信頼構築と深い転換",
                "wechat_strategy_desc": "安全性、5つ星ホテル、プライベートガイドに関する深い記事を公開。コンサルテーションにはミニプログラムを使用。",
                "douyin_strategy": "抖音 - ビジュアルシーディングと感情共鳴",
                "douyin_strategy_desc": "高齢者の快適さ、子供の喜び、家族の瞬間を紹介する高インパクトの短編動画を共有。",
                
                // 合作伙伴
                "partners_title": "戦略的パートナーシップ",
                "partners_subtitle": "優れた体験を創り出すための業界リーダーとの協力",
                "partners_sales": "販売・流通パートナー",
                "partners_ground": "地上運営ネットワーク",
                "partners_experience": "体験プロバイダー",
                "partners_strategic": "戦略的・信頼性パートナー",
                
                // 图库
                "gallery_title": "モーメント＆ギャラリー",
                "gallery_subtitle": "Playfluenceが企画した体験の本質を捉える",
                "gallery_family": "家族の喜び",
                "gallery_cultural": "文化的没入",
                "gallery_nature": "自然と発見",
                "gallery_events": "イベントと祝典",
                
                // 可持续未来
                "sustainability_title": "持続可能な未来",
                "sustainability_subtitle": "レクリエーション産業における持続可能な未来をリード",
                "sustainability_commitment": "Playfluenceでは、真のレクリエーションは現在を喜ばせ、未来を気遣うべきだと信じています。持続可能性はマーケティングのタグではなく、私たちのビジネスロジックと創造的物語の礎石です。",
                "green_destinations": "グリーン目的地のエンパワーメント",
                "green_destinations_desc": "認証を持つ動物園やグリーン運営を実践するテーマパークとのパートナーシップを優先します。",
                
                // 联系方式
                "contact_title": "お問い合わせ",
                "contact_subtitle": "当社の専門家にお問い合わせください",
                "contact_form_name": "お名前",
                "contact_form_email": "メールアドレス",
                "contact_form_phone": "電話番号",
                "contact_form_wechat": "微信ID",
                "contact_form_family": "家族構成",
                "contact_form_message": "メッセージ",
                "contact_form_submit": "メッセージを送信",
                
                // 页脚
                "footer_rights": "© 2023 Playfluence。全著作権所有。",
                "footer_privacy": "プライバシーポリシー",
                "footer_terms": "利用規約",
                
                // 通用
                "cta_book": "相談を予約",
                "cta_itinerary": "旅程を入手",
                "learn_more": "詳細を見る",
                "view_details": "詳細を見る",
                "contact_us": "お問い合わせ",
                "explore_more": "もっと探る",
                "download_brochure": "パンフレットをダウンロード",
                "schedule_call": "通話を予約"
            }
        };
    }
    
    applyLanguage() {
        // 更新所有有 data-i18n 属性的元素
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(element => {
            this.translateElement(element);
        });
        
        // 更新页面标题
        this.updatePageTitle();
        
        // 更新HTML lang属性
        document.documentElement.lang = this.currentLang;
        
        // 保存语言偏好
        localStorage.setItem('playfluence_lang', this.currentLang);
        
        console.log(`Language applied: ${this.currentLang}`);
    }
    
    translateElement(element) {
        const key = element.getAttribute('data-i18n');
        if (!key) return;
        
        const translation = this.getTranslation(key);
        
        // 如果找到了翻译，更新元素内容
        if (translation && translation !== key) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                // 输入框的placeholder
                element.placeholder = translation;
            } else if (element.tagName === 'IMG' && element.hasAttribute('alt')) {
                // 图片的alt文本
                element.alt = translation;
            } else if (element.tagName === 'OPTION') {
                // 选项的文本
                element.textContent = translation;
            } else {
                // 普通元素的文本内容
                element.textContent = translation;
            }
        }
    }
    
    getTranslation(key) {
        // 从当前语言的翻译中获取
        let translation = this.translations[this.currentLang]?.[key];
        
        // 如果当前语言没有翻译，回退到英语
        if (!translation && this.currentLang !== 'en') {
            translation = this.translations['en']?.[key];
        }
        
        // 如果还是没有翻译，返回键名本身
        return translation || key;
    }
    
    updatePageTitle() {
        const pageTitles = {
            'index.html': {
                en: 'Playfluence - Redefining Recreation Marketing',
                zh: 'Playfluence - 重新定义休闲营销',
                ja: 'Playfluence - レクリエーション・マーケティングの再定義'
            },
            'about/index.html': {
                en: 'About Us - Playfluence',
                zh: '关于我们 - Playfluence',
                ja: '会社概要 - Playfluence'
            },
            'about/leadership.html': {
                en: 'Leadership Team - Playfluence',
                zh: '领导团队 - Playfluence',
                ja: 'リーダーシップチーム - Playfluence'
            },
            'services/index.html': {
                en: 'Our Services - Playfluence',
                zh: '我们的服务 - Playfluence',
                ja: 'サービス - Playfluence'
            },
            'services/golden-route.html': {
                en: 'Golden Route Tour - Playfluence',
                zh: '黄金之旅 - Playfluence',
                ja: 'ゴールデンルートツアー - Playfluence'
            },
            'services/pricing.html': {
                en: 'Pricing - Playfluence',
                zh: '定价 - Playfluence',
                ja: '価格 - Playfluence'
            },
            'insights/index.html': {
                en: 'Target Audience - Playfluence',
                zh: '目标客群 - Playfluence',
                ja: 'ターゲット客層 - Playfluence'
            },
            'insights/edge.html': {
                en: 'Competitive Edge - Playfluence',
                zh: '竞争优势 - Playfluence',
                ja: '競争優位性 - Playfluence'
            },
            'insights/trends.html': {
                en: 'Market Trends - Playfluence',
                zh: '市场趋势 - Playfluence',
                ja: '市場動向 - Playfluence'
            },
            'insights/marketing.html': {
                en: 'Marketing Strategy - Playfluence',
                zh: '营销策略 - Playfluence',
                ja: 'マーケティング戦略 - Playfluence'
            },
            'insights/partners.html': {
                en: 'Partnerships - Playfluence',
                zh: '合作伙伴 - Playfluence',
                ja: 'パートナー - Playfluence'
            },
            'gallery.html': {
                en: 'Moments & Gallery - Playfluence',
                zh: '精彩瞬间 - Playfluence',
                ja: 'モーメント＆ギャラリー - Playfluence'
            },
            'sustainability.html': {
                en: 'Sustainable Future - Playfluence',
                zh: '可持续未来 - Playfluence',
                ja: '持続可能な未来 - Playfluence'
            },
            'contact.html': {
                en: 'Contact Us - Playfluence',
                zh: '联系我们 - Playfluence',
                ja: 'お問い合わせ - Playfluence'
            }
        };
        
        const path = window.location.pathname;
        const currentPage = path.split('/').pop() || 'index.html';
        
        let title = pageTitles[currentPage]?.[this.currentLang] || 
                   pageTitles[currentPage]?.en || 
                   'Playfluence';
        
        document.title = title;
    }
    
    setupLanguageSwitcher() {
        const languageSwitcher = document.querySelector('.language-switcher');
        if (!languageSwitcher) return;
        
        // 更新按钮状态
        const buttons = languageSwitcher.querySelectorAll('.lang-btn');
        buttons.forEach(button => {
            const lang = button.getAttribute('data-lang');
            button.classList.toggle('active', lang === this.currentLang);
            
            // 添加点击事件
            button.addEventListener('click', (e) => {
                e.preventDefault();
                this.switchLanguage(lang);
            });
        });
    }
    
    switchLanguage(lang) {
        if (lang === this.currentLang) return;
        
        this.currentLang = lang;
        this.applyLanguage();
        
        // 更新按钮状态
        const buttons = document.querySelectorAll('.lang-btn');
        buttons.forEach(button => {
            button.classList.toggle('active', button.getAttribute('data-lang') === lang);
        });
        
        // 触发自定义事件
        const event = new CustomEvent('languageChanged', {
            detail: { language: lang }
        });
        document.dispatchEvent(event);
        
        console.log(`Language switched to: ${lang}`);
    }
    
    setupContentObserver() {
        // 观察DOM变化，以便翻译动态添加的内容
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.addedNodes.length) {
                    mutation.addedNodes.forEach((node) => {
                        if (node.nodeType === 1) { // 元素节点
                            const elements = node.querySelectorAll ? 
                                node.querySelectorAll('[data-i18n]') : [];
                            elements.forEach(element => {
                                this.translateElement(element);
                            });
                            
                            // 如果节点本身有data-i18n属性
                            if (node.hasAttribute && node.hasAttribute('data-i18n')) {
                                this.translateElement(node);
                            }
                        }
                    });
                }
            });
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
    
    // 公共方法：手动触发翻译
    refresh() {
        this.applyLanguage();
    }
}

// 创建全局实例
window.languageManager = new LanguageManager();

// DOM加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    // 语言管理器会自动初始化
});