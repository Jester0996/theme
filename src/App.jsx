import React, {useState, useEffect, useRef} from 'react';
import ModalWindow from './assets/components/ModalWindow';

// import AllGallery from './assets/components/AllGallery';
// import Banners from './assets/components/Banners';
// import YouTubeThumbnails from './assets/components/YouTubeThumbnails';
// import YouTubeDesing from './assets/components/YouTubeDesing';
// import InstagramStories from './assets/components/InstagramStories';

import Review from './assets/components/Review';

import Theme from './assets/components/Theme';

import ModalMenu from './assets/components/ModalMenu';
import Resize from './assets/components/Resize';


function App() {

	 const isPortrait = Resize();
  const {theme, setTheme} = Theme();
  const [isDarkTheme, setIsDarkTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark';
  });

  const toggleTheme = () => {
    if (isDarkTheme) {
      lightTheme();
    } else {
      darkTheme();
    }
    setIsDarkTheme(!isDarkTheme);
  };

  const lightTheme = () => {
    setTheme('light');
  }

  const darkTheme = () => {
    setTheme('dark');
  }

  const renderComponent = () => {
    switch (selectedCategory) {
      case "All":
        return <AllGallery/>;
        case "Banners":
        return <Banners/>;
        case "YouTubeThumbnails":
        return <YouTubeThumbnails/>;
        case "YouTubeDesing":
        return <YouTubeDesing/>;
        case "InstagramStories":
        return <InstagramStories/>;
        default:
          return <AllGallery/>;
    }
  };

  const [showModal, setShowModal] = useState(false);
  const [showModalMenu, setShowModalMenu] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const hanleCloseModal = () => {
    setShowModal(false);
  };

    const handleOpenModalMenu = () => {
    setShowModalMenu(true);
  };

  const hanleCloseModalMenu = () => {
    setShowModalMenu(false);
  };

  const containerRef = useRef(null);
  const reviewWidthRef = useRef(0);

  const reviews = [
    <Review key={1} name='Николай' link='https://t.me/coderum'
    text='Текст отзывы, оставленного клиентом в ТГ канале, который можно открыть нажав на кнопку в правом верхнем углу'
    />,
    <Review key={2} name='Виктор' link='https://t.me/coderum'
    text='Отзыв оставленный Виктором'
    />,
    <Review key={3} name='Анна' link='https://t.me/coderum'
    text='Отзыв оставленный Анной'
    />,
  ];

  const visibleReviews = 3;

  const handleScroll = () => {
    const box = containerRef.current;
    const width = reviewWidthRef.current * visibleReviews;
    if (box.scrollLeft <= 0) {
      box.style.scrollBehavior = 'auto';
      box.scrollLeft = box.scrollWidth - 2 * width;
      box.style.scrollBehavior = 'smooth';
    }

      if (box.scrollLeft >= box.scrollWidth - width) {
      box.style.scrollBehavior = 'auto';
      box.scrollLeft =  width;
      box.style.scrollBehavior = 'smooth';
    }
  };

  const btnPrevReview = () => {
    const box = containerRef.current;
    box.scrollLeft -= reviewWidthRef.current;
  };

  const btnNextReview = () => {
  const box = containerRef.current;
  box.scrollLeft += reviewWidthRef.current;
  };

  useEffect(() => {
    const box = containerRef.current;
    const firstReview = box.querySelector('.review-card');
    reviewWidthRef.current = firstReview.clientWidth;
    const width = reviewWidthRef.current * visibleReviews;

    box.scrollLeft = (box.scrollWidth - width) / 2;
    box.addEventListener('scroll', handleScroll);

    return () => {
      box.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const [scroll, setScroll] = useState(0);

  const scrollUp = () => {
    setScroll(window.scrollY)
  }

  const upButton = () => {
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
  }

  useEffect(() => {
    window.addEventListener("scroll", scrollUp)
  }, [])

  const toBlock = (height) => {
    window.scrollTo({top: height, left: 0, behavior: 'smooth'})
  }

  
	return (
		<div>
			      <header>

        {isPortrait ? (

        <div className='navigation'>  

        <div className="menu">
          <a onClick={upButton}>Обо мне</a>
          <a onClick={(e) => toBlock(e.target.getAttribute('height'))} height="700">Услуги</a>
          <a onClick={(e) => toBlock(e.target.getAttribute('height'))} height="1230">Отзывы</a>
          <a onClick={(e) => toBlock(e.target.getAttribute('height'))} height="1920">Гарантии</a>
          {/* <a onClick={(e) => toBlock(e.target.getAttribute('height'))} height="2600"></a> */}
        </div>

        <div className='header-buttons'>  

        <button onClick={handleOpenModal} className="btn">Связаться</button>


        <a href="#" target="_blank" className={theme === 'light' ? "icon telegram light" : "icon telegram dark"}> </a>
        <a href="#" target="_blank" className={theme === 'light' ? "icon vk light" : "icon vk dark"}> </a>

        <div className="switch" onClick={toggleTheme}>
          <div className={theme === 'light' ? "theme light" : "theme dark"}
          style={{ transform: isDarkTheme ? 'translateX(34px)' : 'translate(0)'}}></div>
        </div>
        </div>


      </div> )
      : (
        <div className='navigation'>  
                <div className="switch switch-mobile" onClick={toggleTheme}>
          <div className={theme === 'light' ? "theme theme-mobile light" 
                                            : "theme  theme-mobile  dark"}
          style={{ transform: isDarkTheme ? 'translateX(8.6vw)' : 'translate(0)'}}></div>
        </div>


        <div className='header-buttons-mobile'>  
        <a href="#" target="_blank" 
        className={theme === 'light' ? "icon icon-mobile telegram light" 
                                     : "icon icon-mobile  telegram dark"}> </a>
        <a href="#" target="_blank" className={theme === 'light' ? "icon icon-mobile  vk light" 
                                                                 : "icon icon-mobile  vk dark"}> </a>

       <a onClick={handleOpenModalMenu} className={theme === 'light' ? "icon-menu light" : "icon-menu dark"} />
        </div>

      </div>

      )}
      </header>

			      <ModalMenu show={showModalMenu} onClose={hanleCloseModalMenu}>
               <a onClick={upButton}>Обо мне</a>
          <a onClick={(e) => toBlock(e.target.getAttribute('height'))} height="700">Услуги</a>
          <a onClick={(e) => toBlock(e.target.getAttribute('height'))} height="1230">Отзывы</a>
          <a onClick={(e) => toBlock(e.target.getAttribute('height'))} height="1920">Гарантии</a>
          {/* <a onClick={(e) => toBlock(e.target.getAttribute('height'))} height="2600"></a> */}
    </ModalMenu>

	<ModalWindow show={showModal} onClose={hanleCloseModal}>
			<h2 style={{color: "#4824ff", fontSize: isPortrait ? "40px" : '15vw',
																		marginTop: isPortrait ? '' : '0'
				}}>Контакты</h2>
				{isPortrait ? (
			<p style={{fontSize: "22px"}}>Вы можете связаться со мной в Телеграмме <br/> 
																		или ВК </p>) 
			: ( <p style={{fontSize: "22px"}}>Вы можете связаться со мной в Телеграмме
																		или ВК </p>  )} 
		</ModalWindow>

		{isPortrait ? (   

      <div className='welcome-block'>
        <div className='first-block'>
          <h1> Frontend-разработчик <span className='title'>
            Junior
            </span> </h1>
            <h2 style={{marginBottom: "7%", marginTop: "7%"}}>
              Создам <span style={{color: "#4824ff"}}>уникальный</span>
               <br/> сайт под ваши запросы
            </h2>

            <h3>
              Занимаюсь версткой сайтов <br/>
              на протяжение  <span style={{color: "#4824ff"}}> 2 лет</span>
            </h3>    
        </div>

        <div className='main-image-box' >
       <img   className='main-box' src='./images/55.png' draggable='false'/> 
        </div> 

      </div> )

      : (  
      <div className='welcome-block mobile'>
        <div className='main-image-box mobile' >
       <img  className='main-box mobile' src='./images/55.png' draggable='false'/> 
        </div> 
      


        <div className='first-block mobile'>
          <h1> Frontend-разработчик <span className='title'>
            Junior
            </span> </h1>
            <h2 style={{marginBottom: "7%", marginTop: "7%"}}>
              Создам <span style={{color: "#4824ff"}}> уникальный </span>
                сайт под ваши запросы
            </h2>

            <h3>
              Занимаюсь версткой сайтов <br/>
              на протяжение  <span style={{color: "#4824ff"}}> 2 лет</span>
            </h3>   
        
        <button onClick={handleOpenModal} className="btn mobile">Связаться</button>
 
        </div>
    

    </div>
    )}


		<div className={isPortrait ? 'service-block' : "service-block mobile"} draggable="false">
  <h1 style={{ fontSize: isPortrait ? "52px" : '10vw'}}> Услуги </h1>
  <p style={{ fontSize: isPortrait ? "27px" : '6vw'}}>Создаю
    <span style={{ color: "#4824ff"}}> сайт </span> 
    по следующим направлениям:
  </p>

  <div  style={{display: isPortrait ? "flex" : ''}} >
    <p className={isPortrait ? "tag" : "tag mobile"}>
    <p className={`tag-icon ${isPortrait ? '' : 'mobile'}`}></p>одностраничные сайты</p>
    <p className={isPortrait ? "tag" : "tag mobile"}><p className={`tag-icon ${isPortrait ? '' : 'mobile'}`}></p>сайти визитки</p>
    <p className={isPortrait ? "tag" : "tag mobile"}><p className={`tag-icon ${isPortrait ? '' : 'mobile'}`}></p>многостраничные сайты</p>
    <p className={isPortrait ? "tag" : "tag mobile"}><p className={`tag-icon ${isPortrait ? '' : 'mobile'}`}></p>сайты на реакте</p>
  </div>

   <div  style={{display: isPortrait ? "flex" : '', marginTop: isPortrait ? '16px' : ''}} >
    <p className={isPortrait ? "tag" : "tag mobile"}><p className={`tag-icon ${isPortrait ? '' : 'mobile'}`}></p>оформление любого качества</p>
   <p className={isPortrait ? "tag" : "tag mobile"}><p className={`tag-icon ${isPortrait ? '' : 'mobile'}`}></p>pабота над уже существующим сайтом</p>
 
  </div>

  <p style={ {fontSize: isPortrait ? '27px' : '6vw'}}> Открыт для обсуждения для всего.
    <br/>
    Детальней готов обсудить при 
    <span style={{color: '#4824ff', cursor: "pointer"}} 
    onClick={handleOpenModal}> личной переписке</span>.</p>

</div>

{/* <div className='portfolio-block'>
  <div className={isPortrait ? "first-block" : "first-block mobile"}>
    <h1 className={isPortrait ? 'main-title' : 'main-title mobile'}>Портфолио</h1>
    <div style={{ position: "absolute", marginLeft: isPortrait ? '-660px' : '-75vw'}}>
      <p className={isPortrait ? 'gradient-part-one' : 'gradient-part-one mobile' }></p>
      {isPortrait ? ( <p className='title-border'>Портф</p> )
      : ( <p className='title-border mobile'>Пор</p>)}

    </div>

    <div style={{ position: "absolute", marginLeft: isPortrait ? '620px' : '75vw'}}>
      <p className={isPortrait ? 'gradient-part-two' : 'gradient-part-two mobile' }></p>
      {isPortrait ? ( <p className='title-border'>фолио</p> )
      : ( <p className='title-border mobile'>лио</p>)} 
    </div>
    <img className={isPortrait ? 'array-icon' : 'array-icon mobile'} src='./icons/array.png'
    draggable="false"/>
  </div>

  <div className={isPortrait ? "" : "filter-scrollbar"}>

  <div style={{display: "flex", justifyContent: "center", marginBottom: "20px"}}>
      <p className={`tag ${selectedCategory === 'All' ? 'selected' : ''}
      ${isPortrait ? '' : 'mobile'}`}               
      onClick={() => setSelectedCategory('All')}>
        Все работы</p>
      <p className={`tag ${selectedCategory === 'Banners' ? 'selected' : ''}
       ${isPortrait ? '' : 'mobile'}`}
      onClick={() => setSelectedCategory('Banners')}>
        Банеры</p>
     <p className={`tag ${selectedCategory === 'YouTubeThumbnails' ? 'selected' : ''}
      ${isPortrait ? '' : 'mobile'}`}
      onClick={() => setSelectedCategory(' YouTubeThumbnails')}>
        Превью Ютуб</p>
      <p className={`tag ${selectedCategory === 'YouTubeDesing' ? 'selected' : ''}
       ${isPortrait ? '' : 'mobile'}`}
      onClick={() => setSelectedCategory('YouTubeDesing')}>
        Оформление Ютуб </p>
      <p className={`tag ${selectedCategory === 'InstagramStories' ? 'selected' : ''}
       ${isPortrait ? '' : 'mobile'}`}
      onClick={() => setSelectedCategory('InstagramStories')}>
        Сторис Инстограмм </p>
    </div>
    </div>

    <div className='content' style={{marginLeft: "-5vw",
      marginRight: "-5vw"}}>
        {renderComponent()}

    </div>

</div> */}

<div className={isPortrait ? "review-block" : "review-block mobile"}>
  <h1 style={{ fontSize: isPortrait ? '50px' : '10vw'}}>Отзывы</h1>
  <p className={isPortrait ? "description" : "description mobile"}>Отзывы клиентов,
    написаннеы со своих<span className="selecting">личных аккаунтов</span>
    Телеграмм. Всё прозрачно! <br/> Любой отзыв можно <span className='selecting'>открыть</span>
    в ТГ и <span className='selecting'>спросить</span>
    об впечатлениях работы со мной <br/>
    у создателя отзыва лично. 
  </p>

<div className={isPortrait ? "review-carausel" : "review-carausel mobile"}>
        <div className={isPortrait ? "review-container" : "review-container mobile"} 
        ref={containerRef}>
      {reviews.slice(-visibleReviews)}
      {reviews}
      {reviews.slice(0, visibleReviews)}
    </div>
  </div>

  <div style={{ display: "flex", justifyContent: "center" }}>
    <p className={isPortrait ? "next-button" : "next-button mobile"} 
    style={{ transform: "rotate(180deg)" }}>
      <p className='array-next-icon' onClick={btnPrevReview}/></p>
      <p className={isPortrait ? "next-button" : "next-button mobile"}>
        <p className='array-next-icon' onClick={btnNextReview}/></p>
  </div>

</div>

<div className={isPortrait ? "guaruntees-block" : "guaruntees-block mobile"}>
  <h1 style={{fontSize: isPortrait ? "52px" : "10vw", 
            paddingBottom: isPortrait ? "20px" : "0"}}>
    Гарантии </h1>
  <ol className={isPortrait ? 'guarantees-points' : 'guarantees-point mobile'}>
    <li className='point'>
      Оплату принимаю через платёжную систему 
      <span style={{color: "#4824ff"}}>  Название*</span>,
      которая контролирует <br/> безопасность денежных переводов.
    </li>
        <li className='point'>
     Убедится в моей ответственности и профессионализме можно
      <span style={{color: "#4824ff"}}> написав клиентам</span>,
      <br/> оставших отзывы <span style={{color: "#4824ff"}}>лично </span>
      в любой момент (отзывы клиентов выше)
    </li>
        <li className='point'>
          Все <span style={{color: "#4824ff"}}>авторские права </span>
          на работу переходят заказчику после выполнения заказа.
    </li>
        <li className='point'>
      В своих работах использую материалы строго
      <span style={{color: "#4824ff"}}> разрешенные для личного<br/> и коммерческого использования.</span>
    </li>
  </ol>
</div>
<div className='footer'> Workford</div>


<button 
className={scroll < 1960 ? "" : isPortrait ? "btn-up" : "btn-up mobile"}
onClick={upButton}>

</button>



		</div>
	);







}


export default App
