(function () {
  const items = [
    {
      name: 'Saba',
      age: 25,
      job: 'Phillippines',
      images: ['testpic1.jpg', 'testpic2.jpg', 'testpic3.jpg'],
      distance: 25,
      description: 'Lol 😂'
    },
    {
      name: 'Plantain',
      age: 28,
      job: 'Nicaragua',
      images: ['testpic2.jpg', 'testpic4.jpg'],
      distance: 4,
      description: 'Lorem ipsum dolor sit amet, quo ad cibo viris legimus, simul delicata constituto per cu. Pro an commodo liberavisse, cu mutat sensibus tractatos est, animal similique ei nec. Et est molestie phaedrum, ut eam quot meliore. Usu hendrerit complectitur at, at iriure habemus facilisis sit. An eos probo graece.Propriae contentiones eu ius, pro eu ignota liberavisse disputationi, duo ea docendi consectetuer. Cum posse semper ea, ius invidunt qualisque scriptorem cu, ullum reprehendunt pro eu. Illud erant reformidans usu in. Ad vim quem choro iracundia. Ius in case mnesarchum.Duis signiferumque sed cu. Ut duo error congue intellegebat, fugit nostrud urbanitas ei has. Copiosae dissentias te eam, dicta efficiendi mea ad. Numquam persequeris te sea, ad populo graeci per, et mea aperiam noluisse interesset.Malorum abhorreant pri eu, no vidit quaeque mei, usu in dico meliore philosophia. Causae verterem pri in, te case suavitate nam. In ius ignota sanctus. Propriae repudiandae ad sit, gubergren ullamcorper usu ei. Ne vis fierent mediocritatem. Id nominati maluisset ius, soluta graece lobortis ut his, vocibus copiosae placerat est ad.Duo alia ferri impetus ei, deleniti scriptorem comprehensam ius an. Mea ne labore oblique adolescens. Ne velit albucius salutatus quo, cum iudico eripuit bonorum ad. Stet suscipit sea ad. Nec prompta suscipit mandamus at.'
    },
    {
      name: 'Banan',
      age: 21,
      job: 'Finnland',
      images: ['testpic3.jpg'],
      distance: 9,
      description: 'I am rather phallic.'
    },
    {
      name: 'Actually an orange',
      age: 12,
      job: 'Scammer',
      images: ['testpic4.jpg'],
      distance: 2455,
      description: 'Do you like my banana?'
    }
  ];

  const dataProvider = (function* () {
    while (true) {
      yield *items;
    }
  })();

  function adjustNextItem() {
    const top = document.querySelector('.item--top');
    const next = document.querySelector('.item--next');
    const topR = top.getBoundingClientRect();
    next.classList.remove('hidden');
    next.style.top = `${topR.top}px`;
    next.style.width = `${topR.width}px`;
    next.style.height = `${topR.height}px`;
  }

  function updateCards() {
    const top = document.querySelector('.item--top');
    const next = document.querySelector('.item--next');
    const details = document.querySelector('tinderforbananas-details');
    top.style.transform = '';
    top.selected = 0;
    top.data = next.data;
    next.data = dataProvider.next().value;
  }

  function hookupButtons() {
    const details = document.querySelector('.view--details');
    document.querySelectorAll('.control--like').forEach(btn => 
      btn.addEventListener('click', _ => {
        let p = Promise.resolve();
        if (!details.classList.contains('hidden')) {
          p = hideDetails();
        }
        p.then(_ => document.querySelector('.item--top').like());
      })
    );
    document.querySelectorAll('.control--nope').forEach(btn =>
      btn.addEventListener('click', _ => {
        let p = Promise.resolve();
        if (!details.classList.contains('hidden')) {
          p = hideDetails();
        }
        p.then(_ => document.querySelector('.item--top').nope());
      })
    );
    document.querySelectorAll('.control--superlike').forEach(btn => 
      btn.addEventListener('click', _ => {
        let p = Promise.resolve();
        if (!details.classList.contains('hidden')) {
          p = hideDetails();
        }
        p.then(_ => document.querySelector('.item--top').superlike());
      })
    );
  }

  function showDetails(event) {
    const swipelist = document.querySelector('.view--swipelist');
    const details = document.querySelector('.view--details');
    const detailsText1 = details.querySelector('.item__details');
    const detailsText2 = details.querySelector('.description');
    const detailsNav = details.querySelector('nav');
    const carousel = document.querySelector('tinderforbananas-carousel');
    const image = document.querySelector('.view--swipelist .item--top picture');
    details.querySelector('tinderforbananas-details').data = swipelist.querySelector('.item--top').data;

    // Let’s do FLIP!
    const start = image.getBoundingClientRect();
    
    swipelist.classList.add('overlaid');
    details.classList.remove('hidden');

    const target = carousel.getBoundingClientRect();
    carousel.style.transformOrigin = 'top left';
    carousel.style.transform = `scaleX(${start.width/target.width}) scaleY(${start.height/target.height}) translate(${start.left - target.left}px, ${start.top - target.top}px)`;   
    return requestAnimationFramePromise()
      .then(_ => requestAnimationFramePromise())
      .then(_ => {
        carousel.style.transition = 'transform 0.15s ease-in-out';
        carousel.style.transform = 'initial';
        detailsText1.style.transform = 'initial';
        detailsText2.style.transform = 'initial';
        detailsNav.style.transform = 'initial';
        return transitionEndPromise(carousel);
      })
      .then(_ => {
        carousel.style.transform = '';
        carousel.style.transition = '';
        carousel.style.transformOrigin = '';
      });

  }

  function hideDetails(event) {
    const swipelist = document.querySelector('.view--swipelist');
    const details = document.querySelector('.view--details');
    const detailsText1 = details.querySelector('.item__details');
    const detailsText2 = details.querySelector('.description');
    const detailsNav = details.querySelector('nav');
    const carousel = document.querySelector('tinderforbananas-carousel');
    const item = document.querySelector('.view--swipelist .item--top');
    const image = document.querySelector('.view--swipelist .item--top picture');

    item.selected = event && event.detail.selected || 0;

    const start = carousel.getBoundingClientRect();
    swipelist.classList.remove('overlaid');
    details.classList.add('hidden');
    const target = image.getBoundingClientRect();
    swipelist.classList.add('overlaid');
    details.classList.remove('hidden');

    item.style.overflow = 'visible';
    carousel.style.transformOrigin = 'top left';
    carousel.style.transition = 'transform 0.15s ease-in-out';
    return requestAnimationFramePromise()
      .then(_ => requestAnimationFramePromise())
      .then(_ => {
        carousel.style.transform = `scaleX(${target.width/start.width}) scaleY(${target.height/start.height}) translate(${target.left - start.left}px, ${target.top - start.top}px)`;   
        detailsText1.style.transform = '';
        detailsText2.style.transform = '';
        detailsNav.style.transform = '';
        return transitionEndPromise(carousel);
      })
      .then(_ => {
        carousel.style.transform = '';
        carousel.style.transition = '';
        carousel.style.transformOrigin = '';
        item.style.overflow = 'hidden';
        details.classList.add('hidden');
        swipelist.classList.remove('overlaid');
      });
  }

  function copyControls() {
    document.querySelectorAll('.view--details .control').forEach(btn => {
      const actionName = Array.from(btn.classList).find(name => /(like|nope)/.test(name));
      const svg = document.querySelector(`.view--swipelist .${actionName} svg`).cloneNode(true);
      btn.appendChild(svg);
    });
  }

  function init() {
    const top = document.querySelector('.item--top');
    top.data = dataProvider.next().value;
    top.addEventListener('swipe', updateCards);
    top.addEventListener('details', showDetails);
    const next = document.querySelector('.item--next');
    next.data = dataProvider.next().value;
    const details = document.querySelector('tinderforbananas-details');
    details.addEventListener('dismiss', hideDetails);
    copyControls();
    adjustNextItem();
    window.addEventListener('resize', adjustNextItem);
    hookupButtons();
  }
  init();
})();