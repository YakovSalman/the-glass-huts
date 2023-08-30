// Custom scripts

const menu = document.querySelector('.menu');
const navList = document.querySelector('.nav__list');
const body = document.querySelector('.main__body');
const listWrap = document.querySelector('.nav__list-wrap')


menu.addEventListener('click', (e) => {
  e.preventDefault();
  menu.classList.toggle('active');
  body.classList.toggle('locked');
  navList.classList.toggle('active');

  const heightList = listWrap.offsetHeight + 50

  if(window.screen.height <= heightList) {
    listWrap.classList.add('active');
  } else{
    listWrap.classList.remove('active');
  }

})

const swiperEl = document.querySelectorAll('.swiper');

swiperEl.forEach(el => {
  const contentWrap = el.closest('.content__wrap');

  const swiper = new Swiper(el, {
    slidesPerView: 1,
    spaceBetween: 20,

    pagination: {
      el: contentWrap.querySelector('.swiper-pagination'),
      type: 'fraction',
    },

    navigation: {
      nextEl: contentWrap.querySelector('.swiper-button-next'),
      prevEl: contentWrap.querySelector('.swiper-button-prev'),
    },

    scrollbar: {
      el: contentWrap.querySelector('.swiper-scrollbar'),
    },
  });

})

// -------accordion---------

const accordion = document.querySelectorAll('.accordion');

accordion.forEach(el => {
  const acordionItem = el.querySelectorAll('.accordion__item');

  acordionItem.forEach(triggerEl => {
    triggerEl.addEventListener('click', (e) => {

      if (!e.target.classList.contains('accordion__add-services')) {
        const self = e.currentTarget;
        const accordionContent = self.querySelector('.accordion__content');
        const arrow = self.querySelector('.accordion-arrow');
        const height = accordionContent.scrollHeight;

        self.classList.toggle('active')

        if(self.classList.contains('active')) {
          accordionContent.style.maxHeight = height + 'px';
          accordionContent.style.marginTop = '24px';
          arrow.classList.add('active');
        } else {
          accordionContent.style.maxHeight = '';
          accordionContent.style.marginTop = '';
          arrow.classList.remove('active');
        }
      }
    });
  });
});


// select

function select() {

  const select = document.querySelectorAll('.select-card');

  select.forEach(el => {
    const trigger = el.querySelector('.select-card-btn');
    const content = el.querySelector('.select-card-list');
    const arrowEl = el.querySelector('.select-card-arrow i');
    const icon = el.querySelector('.select-card-icon');
    const item = content.querySelectorAll('.select-card-item');

    trigger.addEventListener('click', (e) => {
      e.stopPropagation()

      content.classList.toggle('active');
      arrowEl.classList.toggle('active');
    })
    item.forEach(item => {
      item.addEventListener('click', (e) => {
        e.stopPropagation();
        trigger.value = item.innerText;

        trigger.classList.add('active');
        content.classList.remove('active');
        arrowEl.classList.remove('active');

        if(trigger.value != '') {
          const btnArrow = arrowEl.closest('.select-card-arrow')
          btnArrow.classList.remove('inactive')
          icon.classList.remove('inactive')
          trigger.classList.remove('inactive')

        }
      })
    })

    document.addEventListener('click', (e) => {
      if(!e.target.closest('.select-card')) {
        content.classList.remove('active');
        arrowEl.classList.remove('active');
      }
    })
  })
}
select()


function selectLanguage() {

  const select = document.querySelectorAll('.select-language');
  const formTel = document.querySelector('.form-info__item-tel')
  if(formTel) {
    phone()
  }

  select.forEach(el => {
    const trigger = el.querySelector('.select-language-btn');
    const content = el.querySelector('.select-language-list');
    const arrow = el.querySelector('.select-arrow');
    const item = content.querySelectorAll('.select-language-item');

    trigger.addEventListener('click', (e) => {
      e.stopPropagation()

      content.classList.toggle('active');
      arrow.classList.toggle('active');


      item.forEach(item => {
        const triggerImg = trigger.querySelector('img')
        const currentImg = item.querySelector('img');

        if(triggerImg.getAttribute('src') == currentImg.getAttribute('src')) {
          item.classList.add('inactive')
        } else {
          item.classList.remove('inactive')
        }

      })

    })
    item.forEach(item => {
      item.addEventListener('click', (e) => {
        e.stopPropagation();
        const triggerImg = trigger.querySelector('img');
        const currentImg = item.querySelector('img');
        const cloneImhEl = currentImg.cloneNode(false);
        triggerImg.remove();

        trigger.insertAdjacentElement('afterbegin', cloneImhEl);

        trigger.classList.add('active');
        content.classList.remove('active');
        arrow.classList.remove('active');
        if(formTel) {
          phone()
        }
      })
    })
    document.addEventListener('click', (e) => {

      if(!e.target.closest('.select-card')) {
        content.classList.remove('active');
        arrow.classList.remove('active');
      }
    })
  })
}
selectLanguage()


// form-data

const formData = document.querySelectorAll('.form-data');
let guests = {};
if(localStorage.getItem('guests')) {
  guests = JSON.parse(localStorage.getItem('guests'))
}
formData.forEach(form => {
  const formWrapNumber = form.querySelector('.form-data-item-wrap');
  const formInputCalendar = form.querySelectorAll('.form-data-date');
  const btnFormData = form.querySelector('.btn-form-data');

  const formInputNum = formWrapNumber.querySelector('.form-data-num');
  const btnMinus = formWrapNumber.querySelector('.btn-minus');
  const btnPlus = formWrapNumber.querySelector('.btn-plus');
  const formCalendar = form.querySelector('.form-data-calendar');
  const calendar = form.querySelector('.calendar');


  if(calendar) {
    btnFormData.addEventListener('click', (e) => {

      formInputCalendar.forEach(input => {
        if(input.value == '') {
          e.preventDefault()

          input.classList.add('inactive')
        } else {
          input.classList.remove('inactive')
        }
      })
    })
    form.addEventListener('submit', (e) => {
      e.preventDefault();
    });

    formCalendar.addEventListener('click', (e) => {
      e.stopPropagation()
      calendar.classList.add('active');
    })


    document.addEventListener('click', (e) => {
      if(!e.target.closest('.calendar')) {
        calendar.classList.remove('active');
      }
    })

    if(calendar != null) {
      const btnEvent = calendar.querySelector('.calendar-btn-event');
      const btnClear = calendar.querySelector('.calendar-btn-clear');

      btnEvent.addEventListener('click', () => {
        calendar.classList.remove('active');
      })

      btnClear.addEventListener('click', () => {
        const calendarItem = calendar.querySelectorAll('li.active');
        calendarItem.forEach(item => {
          item.classList.remove('active')
        })
      })
    }
    guests['value'] = formInputNum.value
    saveToLocalStorageGuests()
    btnPlus.addEventListener('click', () => {
      if(formInputNum.value != 3) {
        let formInputValue = parseInt(formInputNum.value);

        let value = ++formInputValue ;
        formInputNum.value = value;

        guests['value'] = formInputNum.value
        saveToLocalStorageGuests()
      }
    })

    btnMinus.addEventListener('click', () => {
      if (formInputNum.value != 1) {
        let formInputValue = parseInt(formInputNum.value);

        let value = --formInputValue;
        formInputNum.value = value;

        guests['value'] = formInputNum.value
        saveToLocalStorageGuests()
      }
    })

  }

  const guestsPayment = document.querySelector('.guests-payment')
  if(guestsPayment) {
    guestsPayment.value = guests.value
  }

  function saveToLocalStorageGuests() {
    localStorage.setItem('guests', JSON.stringify(guests));
  }
});


// servises data
const formstNumber = (x) =>  x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, '.');
const formstNumber2 = (x) => x.toString().replace('.', '');

const servicesWrapper = document.querySelector('.accordion-services')
const servicesAdd = document.querySelector('.services-add');
const servicesPayment = document.querySelector('.services-add-payment')
let services = [];

if(localStorage.getItem('services')) {
  services = JSON.parse(localStorage.getItem('services'));
}

test()

function test() {
  if(servicesAdd) {
    if(Array.from(servicesAdd.children).length < 1) {
      services = []
      localStorage.removeItem('services')
    }
  }
}

services.forEach(service => {

  if(servicesPayment) {
    const addItemHtml = `<div class="services-add-item">
                            <div class="services-add-name">${service.title}</div>
                            <div class="services-add-price">${service.price}</div>
                          </div>`

    servicesPayment.insertAdjacentHTML('beforeend', addItemHtml);
  }

})

if(servicesWrapper != null) {
  servicesWrapper.addEventListener('click', (e) => {
    if (e.target.classList.contains('accordion__add-services')) {
      const servicesItem = e.target.closest('.accordion__item');
      const servicesTitle = servicesItem.querySelector('.accordion__trigger-title');
      const servicesPrice = servicesItem.querySelector('.accordion__trigger-subtitle');

      const newService = {
        title: servicesTitle.innerText,
        price: servicesPrice.innerText
      }
      services.push(newService)
      saveToLocalStorage()

      const addItemHtml = `<div class="services-add-item">
                                <div class="services-add-name">${newService.title}</div>
                                <div class="services-add-price">${newService.price}</div>
                                <button class="services-add-close">
                                    <i class="fa-solid fa-xmark services-icon"></i>
                                </button>
                              </div>`

      servicesAdd.insertAdjacentHTML('beforeend', addItemHtml);


      const addItem = document.querySelectorAll('.services-add-item');

      addItem.forEach(item => {
        const itemName = item.querySelector('.services-add-name');
        if(newService.title === itemName.innerText) {
          e.target.setAttribute('disabled', '');
          e.target.classList.add('active');
        }

      })
      calcPrice ()
      test()
    }
  })
}

// remove from cart
if(servicesAdd) {
  servicesAdd.addEventListener('click', (e) => {

    const addItem = e.target.closest('.services-add-item');
    if(addItem == null) return

    const serviceName = addItem.querySelector('.services-add-name');
    const accordionItem = servicesWrapper.querySelectorAll('.accordion__item');
    accordionItem.forEach(item => {
      const accordionTitle = item.querySelector('.accordion__trigger-title');
      const BtnAdd = item.querySelector('.accordion__add-services');

      if (serviceName.innerText == accordionTitle.innerText) {
        BtnAdd.classList.remove('active');
        BtnAdd.removeAttribute('disabled');
      }
    })

    if(e.target.classList.contains('services-add-close')) {
      addItem.remove()
    }

    const index = services.findIndex(service => {
      if(service.title == serviceName.textContent) {
        return true
      }
    })
    services.splice(index, 1)



    calcPrice ()
    saveToLocalStorage()
    test()
  });
}

// price calculator

function calcPrice () {
  const servicesItem = document.querySelectorAll('.services-add-item');
  const fullPrice = document.querySelector('.services-price');

  let totalPrice = 0;

  let FullPrice = {}

  if(localStorage.getItem('FullPrice')) {
    FullPrice = JSON.parse(localStorage.getItem('FullPrice'))
  }

  servicesItem.forEach(item => {

    const price = item.querySelector('.services-add-price');
    const formstPrice = parseInt(formstNumber2(price.innerText));

    totalPrice += formstPrice;

    const newPrice = {
      price: totalPrice
    }
    FullPrice['price'] = `${totalPrice}`

    fullPrice.textContent = `${FullPrice.price}kr`;

    fullPrice.textContent = `${formstNumber(newPrice.price)}kr`;
  })

  if(fullPrice) {
    if(servicesItem.length < 1) {
      fullPrice.textContent = `0`;
    }
  }


  function saveToLocalStoragePrice() {
    localStorage.setItem('FullPrice', JSON.stringify(FullPrice));
  }

  saveToLocalStoragePrice()
}

// choiceDays ()
calcPrice ()

function saveToLocalStorage() {
	localStorage.setItem('services', JSON.stringify(services));
}

// calendar

const calendar = document.querySelector('.calendar');
const calendarWrap = document.querySelectorAll('.calendar-wrap');
const calendars = []

calendarWrap.forEach(wrap => {
  const days = wrap.querySelector('.calendar-days');
  const month = wrap.querySelector('.calendar-month');
  const month2 = document.querySelector('.calendar-month-2');
  const year = wrap.querySelector('.calendar-year');

  let date = new Date();
  let currentYears = date.getFullYear();
  let currentMonth = date.getMonth();
  let nextMonth = date.getMonth() + 1;

  const months = ["January", "February", "March", "April", "May", "June", "July",
                  "August", "September", "October", "November", "December"];

  const renderCalendar = () => {
    let firstDayofMonth = new Date(currentYears, currentMonth, 1).getDay(),
        lastDateofMonth = new Date(currentYears, currentMonth + 1, 0).getDate();

    let nextFirstDayofMonth = new Date(currentYears, nextMonth, 1).getDay(),
        nextLastDateofMonth = new Date(currentYears, nextMonth + 1, 0).getDate();

    let liTag = ''

    function cycles (firstDayClass, lastDateClass) {
      for (let i = firstDayClass; i > 1; i--) {
        liTag += `<li></li>`
      }

      if(firstDayClass == 0) {
        for (let i = 0; i < 6; i++) {
          liTag += `<li></li>`
        }
      }

      for (let i = 1; i <= lastDateClass; i++) {
        liTag += `<li class="calendar-days-item">${i}</li>`
      }
    }

    if(wrap.classList.contains('calendar-wrap-next')) {
      cycles (nextFirstDayofMonth, nextLastDateofMonth);
    }
    if(wrap.classList.contains('calendar-wrap-prev')) {
      cycles (firstDayofMonth, lastDateofMonth);
    }

    month.textContent = `${months[currentMonth]}`;
    month2.textContent = `${months[nextMonth]}`;
    year.textContent = currentYears;
    days.innerHTML = liTag;

  }
  renderCalendar()
  if(calendar != null) {
    calendar.addEventListener('click', (e) => {

      if(e.target.classList.contains('btn-calendar-next')) {

        if(currentMonth == 11) {
          currentMonth = -1
        }
        if(nextMonth == 11) {
          nextMonth = -1
        }

        month.textContent = months[++currentMonth];
        month2.textContent = months[++nextMonth];
        renderCalendar()
      }

      if(e.target.classList.contains('btn-calendar-prev')) {
        if(currentMonth == 0) {
          currentMonth = 12
        }
        if(nextMonth == 0) {
          nextMonth = 12
        }
        month.textContent = months[--currentMonth];
        month2.textContent = months[--nextMonth];
        renderCalendar()
      }

    })
  }


})

function choiceDays () {

  const calendar = document.querySelector('.calendar')
  const servicesAdd = document.querySelector('.services-add');
  const servicesAddPayment = document.querySelector('.services-add-payment');

  let newLease = {}
  let checkInDate = {}
  let checkOutDate = {}

  if(localStorage.getItem('newLease')) {
    newLease = JSON.parse(localStorage.getItem('newLease'))
  }
  if(localStorage.getItem('checkInDate')) {
    checkInDate = JSON.parse(localStorage.getItem('checkInDate'))
  }
  if(localStorage.getItem('checkOutDate')) {
    checkOutDate = JSON.parse(localStorage.getItem('checkOutDate'))
  }

  const calendarWrapper = document.querySelector('.calendar-wrapper')
  if (calendarWrapper != null) {
    const itemActive = calendarWrapper.querySelectorAll('.calendar-days-item.active')

    const CheckIn = document.getElementById('CheckIn');
    const CheckOut = document.getElementById('CheckOut');

    const itemActiveArray = Array.from(itemActive);
    if(itemActiveArray.length > 1) {
      const itemFirst = itemActiveArray.shift();
      const itemLast = itemActiveArray.shift();



      function selectedDate (variableName) {	      
        // const currentWrap = variableName.closest('.calendar-wrap');
        // const currentMonth = currentWrap.querySelector('.calendar-month');
        // const currentYears = currentWrap.querySelector('.calendar-year');
        // const dateFirst = new Date(`${parseInt(variableName.textContent)} ${parseInt(currentYears.textContent)} ${currentMonth.textContent}`);
	
	      const date1 = new Date;
	      const temporary = document.querySelector('.temporary')
	      temporary.insertAdjacentText('afterbegin', date1)   

	      
        // return dateFirst;
      }
      const diffDate = selectedDate(itemLast) - selectedDate(itemFirst);
      const daysLeft = Math.ceil(diffDate / 1000 / 60 / 60 / 24);
      function formatTime(data) {
        const month = data.getMonth() + 1;
        const daty = data.getDate();
        const year = data.getFullYear();

        return `${month}/${daty}/${year}`;
      }



      CheckIn.value = `${formatTime(selectedDate(itemFirst))}`;
      CheckOut.value = `${formatTime(selectedDate(itemLast))}`;
      checkInDate['valueDate'] = CheckIn.value
      checkOutDate['valueDate'] = CheckOut.value

      const result = 3200 * daysLeft;

      newLease['title'] = `${daysLeft}`
      newLease['price'] = `${result}`


      saveToLocalStorageLease()
      saveToLocalStorageCheckInDate()
      saveToLocalStorageCheckOutDate()

      const servicesAddLeaseHtml = `<div class="services-add-item services-add-item-lease">
                                    <div class="services-add-name">3.200kr x ${daysLeft} nights</div>
                                    <div class="services-add-price">${formstNumber(result)}kr</div>
                                  </div>`

      servicesAdd.insertAdjacentHTML('afterbegin', servicesAddLeaseHtml);
      calendar.classList.remove('active');
      calcPrice()

      function saveToLocalStorageLease() {
        localStorage.setItem('newLease', JSON.stringify(newLease));
      }
      function saveToLocalStorageCheckInDate() {
        localStorage.setItem('checkInDate', JSON.stringify(checkInDate));
      }
      function saveToLocalStorageCheckOutDate() {
        localStorage.setItem('checkOutDate', JSON.stringify(checkOutDate));
      }
    }
  }

  if(servicesAddPayment) {
    const servicesAddLeaseHtml1 = `<div class="services-add-item services-add-item-lease">
      <div class="services-add-name">3.200kr x ${newLease.title} nights</div>
      <div class="services-add-price">${formstNumber(newLease.price)}kr</div>
      </div>`

      servicesAddPayment.insertAdjacentHTML('afterbegin', servicesAddLeaseHtml1);
  }


  const formDataPayment = document.querySelector('.form-data-payment')
  if(formDataPayment) {
    function renderDate(input, array) {
      input = document.getElementById(input);

      input.value = array.valueDate
    }
      renderDate('checkInPayment', checkInDate)
      renderDate('checkOutPayment', checkOutDate)
  }


}

if(calendar != null) {
  calendar.addEventListener('click', (e) => {
    const servicesAddLease = servicesAdd.querySelector('.services-add-item-lease');

    if (e.target.classList.contains('calendar-days-item')){
      e.target.classList.toggle('active');
      const activeEl = calendar.querySelectorAll('.active');
 
      if (activeEl.length > 2) {
        e.target.classList.remove('active');
      }

      if(activeEl.length >= 2) {
        choiceDays ()
      } else {
        if(servicesAddLease == null) return

        servicesAddLease.remove();
        calcPrice()
      }
    }
  })
}

// form

function phone() {

  const itemTel = document.querySelector('.form-info__item-tel');
  const telTrigger = itemTel.querySelector('.select-language-btn');
  const triggerImg = telTrigger.querySelector('img')
  const input = document.getElementById('phoneNumber');
  const value = input.value;

  // ====== denmark ======

  if(triggerImg.classList.contains('denmark')) {

    const result = (x) => x.replace(/(\d{2})(?!\s|$)/gm, `$1 `);
    const regex = /^[0-9+]+$/;

    input.addEventListener('focus', () => {
      if(value == '') {
        input.value = '+ 45 ';
      }
    })

    input.addEventListener('blur', () => {
      if(input.value.length <= 5 ) {
        input.value = '';
      }
    })

    input.addEventListener('input', () => {
      if(input.value == '') {
        input.value = '+ 45 ';
      }

      if (!regex.test(input.value)) {
        input.value = input.value.replace(/[^0-9+]/g, '');
        input.value = result(input.value)
      }

      if(input.value.length > 15) {
        input.value = input.value.slice(0, 15);
      }
    })
  }

  // ====== united kingdom ======

  if(triggerImg.classList.contains('united-kingdom')) {

    const result = (x) => x.replace(/(\d{2})(?!\s|$)/gm, `$1 `);

    const regex = /^[0-9+]+$/;

    input.addEventListener('focus', () => {
      if(value == '') {
        input.value = '+ 44 ';
      }
    })

    input.addEventListener('blur', () => {
      if(input.value.length <= 5 ) {
        input.value = '';
      }
    });

    input.addEventListener('input', () => {
      if(input.value == '') {
        input.value = '+ 44 ';
      }

      if (!regex.test(input.value)) {
        input.value = input.value.replace(/[^0-9+]/g, '');
        input.value = result(input.value)
      }

      if(value.length > 18) {
        input.value = input.value.slice(0, 18);
      }
    })

  }

  // ====== germany ======

  if(triggerImg.classList.contains('germany')) {

    const result = (x) => x.replace(/(\d{2})(?!\s|$)/gm, `$1 `);
    const regex = /^[0-9+]+$/;

    input.addEventListener('focus', () => {
      if(value == '') {
        input.value = '+ 49 ';
      }
    })
    input.addEventListener('blur', () => {
      if(input.value.length <= 5 ) {
        input.value = '';
      }
    });

    input.addEventListener('input', () => {

      if(input.value == '') {
        input.value = '+ 49 ';
      }

      if (!regex.test(input.value)) {
        input.value = input.value.replace(/[^0-9+]/g, '');
        input.value = result(input.value)
      }

      if(input.value.length > 21) {
        input.value = input.value.slice(0, 21);
      }
    })
  }
}

const formPayment = document.querySelectorAll('#formPayment');

function isFormValid(inputs) {
  for (var i = 0; i < inputs.length; i++) {
    if (inputs[i].value.trim() === '') {
      return false;
    }
  }
  return true;
}

function scroolSending () {
  const payment = document.querySelector('.payment__inner');
  const paymentPosition = payment.getBoundingClientRect().top;
  const offsetPosition = paymentPosition - 50
  window.scrollBy ({
    top: offsetPosition,
    behavior: "smooth",
  })
}

formPayment.forEach(form => {
  const inputs = form.querySelectorAll('.form-info-input')
  const testName = /^[a-zA-ZäöüßÄÖÜ]+$/;
  const testEmail = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
  const checkEl = form.querySelector('.form-checkbox');
  const formSending = form.querySelector('.payment-sending');
  const itemCheck =  checkEl.closest('.form-info__item-check');
  const checklabel = itemCheck.querySelector('label');


  const formstInput = (x) => x.replace(/\D/g, '');
  const formstInput2 = (x) => x.replace(/(\d{4})(?!\s|$)/gm, `$1 `);
  const formstInput3 = (x) => x.replace(/(\d{2})(?!\s|$)/gm, `$1/`);





  inputs.forEach(input => {
    input.addEventListener('change', (e) => {

      if(input.value != '') {
        const formInfoItem = input.closest('.form-info__item')
        const arrow = formInfoItem.querySelector('.select-card-arrow')

        input.classList.remove('inactive');
        validate(input)

        if(arrow == null) return
        arrow.classList.remove('inactive');
      } else {
        input.classList.add('inactive');
      }
    })

    input.addEventListener('focus', () => {
      const cuurentItem = input.closest('.form-info__item');
      const cuurentLabel = cuurentItem.querySelector('label');
      if (cuurentLabel == null) {
        return
      }
      cuurentLabel.classList.add('active')
      input.classList.add('active')
    })

    input.addEventListener('blur', () => {
      const cuurentItem = input.closest('.form-info__item');
      const cuurentLabel = cuurentItem.querySelector('label');
      if (cuurentLabel == null) {
        return
      }
      cuurentLabel.classList.remove('active');
      input.classList.remove('active');
    })

    input.addEventListener('input', () => {

      if(
        input.name == 'cardNumber' ||
        input.name == 'expiration' ||
        input.name == 'ccv'        ||
        input.name == 'zitCode'
      ) {
        input.value = formstInput(input.value);
      }

      if(input.name == 'cardNumber') {
        const maxLength = 19;
        input.value = formstInput2(input.value);

        if (input.value.length > maxLength) {
          input.value = input.value.slice(0, maxLength);
        }
      }

      if(input.name == 'expiration') {
        const maxLength = 5;
        input.value = formstInput3(input.value);

        if (input.value.length > maxLength) {
          input.value = input.value.slice(0, maxLength);
        }
      }

      if(input.name == 'ccv') {
        const maxLength = 3;

        if (input.value.length > maxLength) {
          input.value = input.value.slice(0, maxLength);
        }
      }

      if(input.name == 'zitCode') {
        const maxLength = 9;

        if (input.value.length > maxLength) {
          input.value = input.value.slice(0, maxLength);
        }
      }
    })
  })

  checkEl.addEventListener('change', () => {
    if(!checkEl.checked) {
      checklabel.classList.add('inactive')
    } else {
      checklabel.classList.remove('inactive')
    }
  })

  function validate (item) {
  const formInfoItem = item.closest('.form-info__item');
  const formerror = formInfoItem.querySelector('.form-info-error');

    if(
      item.name == 'firstName' ||
      item.name == 'lastName'  ||
      item.name == 'city'      ||
      item.name == 'country'
    ) {
      if(!testName.test(item.value)) {
        formerror.classList.add('active');
        item.classList.add('inactive');
      } else {
        formerror.classList.remove('active');
        item.classList.remove('inactive');
      }
    }

    if(item.name == 'email') {
      if(!testEmail.test(item.value)) {
        formerror.classList.add('active');
        item.classList.add('inactive');
      } else {
        formerror.classList.remove('active');
        item.classList.remove('inactive');
      }
    }

    if(item.name == 'cardNumber') {
      if(item.value.length < 12) {
        formerror.classList.add('active');
        item.classList.add('inactive');
      } else {
        formerror.classList.remove('active');
        item.classList.remove('inactive');
      }
    }

    if(item.name == 'expiration') {
      if(item.value.length < 5) {
        formerror.classList.add('active');
        item.classList.add('inactive');
      } else {
        formerror.classList.remove('active');
        item.classList.remove('inactive');
      }
    }

    if(item.name == 'CCV') {
      if(item.value.length < 3) {
        formerror.classList.add('active');
        item.classList.add('inactive');
      } else {
        formerror.classList.remove('active');
        item.classList.remove('inactive');
      }
    }

    if(item.name == 'zitCode') {
      if(item.value.length < 9) {
        formerror.classList.add('active');
        item.classList.add('inactive');
      } else {
        formerror.classList.remove('active');
        item.classList.remove('inactive');
      }
    }
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault()

    inputs.forEach(input => {
      const formInfoItem = input.closest('.form-info__item')
      const arrow = formInfoItem.querySelector('.select-card-arrow')
      const icon = formInfoItem.querySelector('.select-card-icon')

      if(input.value === '') {
        input.classList.add('inactive');
      } else {
        input.classList.remove('inactive');
      }

      if (arrow) {
        if(input.value === '') {
          arrow.classList.add('inactive');
        } else {
          arrow.classList.remove('inactive');
        }
      }

      if(icon) {
        if(input.value === '') {
          icon.classList.add('inactive');
        } else {
          icon.classList.remove('inactive');
        }
      }

      if(!checkEl.checked) {
        checklabel.classList.add('inactive')
      } else {
        checklabel.classList.remove('inactive')
      }
    })

    if(checkEl.checked) {
      if(isFormValid(inputs)) {
        formSending.classList.add('active')
        scroolSending()
        form.reset()
      }
    }
  });
})



const formConnection = document.querySelectorAll('.form-connection')

formConnection.forEach(form => {
  const inputs = form.querySelectorAll('.form-connection-input')
  const formSending = form.querySelector('.connection-sending');

  function validate(item) {
  const formInfoItem = item.closest('.form-connection-item');
  const formerror = formInfoItem.querySelector('.form-info-error');

  const testName = /^[a-zA-ZäöüßÄÖÜ]+$/;
  const testEmail = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

    if(
      item.name == 'firstName' ||
      item.name == 'lastName'
    ) {
      if(!testName.test(item.value)) {
        formerror.classList.add('active');
        item.classList.add('inactive');
      } else {
        formerror.classList.remove('active');
        item.classList.remove('inactive');
      }
    }

    if(item.name == 'email') {
      if(!testEmail.test(item.value)) {
        formerror.classList.add('active');
        item.classList.add('inactive');
      } else {
        formerror.classList.remove('active');
        item.classList.remove('inactive');
      }
    }
  }
  inputs.forEach(input => {
    input.addEventListener('change', () => {
      validate(input)
    })


    input.addEventListener('focus', () => {
      const cuurentItem = input.closest('.form-connection-item');
      const cuurentLabel = cuurentItem.querySelector('label');

      cuurentLabel.classList.add('active')
      input.classList.add('active')
    })

    input.addEventListener('blur', () => {
      const cuurentItem = input.closest('.form-connection-item');
      const cuurentLabel = cuurentItem.querySelector('label');

      cuurentLabel.classList.remove('active')
      input.classList.remove('active')
    })
  })




  form.addEventListener('submit', (e) => {
    e.preventDefault();

    inputs.forEach(input => {
      if(input.value == '') {
        input.classList.add('inactive');
      } else {
        input.classList.remove('inactive');
      }
    })

    if (isFormValid(inputs)) {
      formSending.classList.add('active')
      form.reset()
    }
  })
})



// form-footer

const formFooter = document.querySelectorAll('.form-footer');

formFooter.forEach(form => {
  const formiInput = form.querySelector('.form__footer-input')
  const testEmail = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
  const error = form.querySelector('.form-footer-error')
  const message = form.querySelector('.form-footer-message')

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if(formiInput.value == '') {
      formiInput.classList.add('inactive');
    } else {
      formiInput.classList.remove('inactive');
    }


    if(formiInput.value != '' && testEmail.test(formiInput.value)) {
      message.classList.add('active');
    } else {
      message.classList.remove('active');
    }

  });
  formiInput.addEventListener('change', () => {
    if(!testEmail.test(formiInput.value)) {
      error.classList.add('active');
    } else {
      error.classList.remove('active');
    }
  });
});


// scroll element

const secondaryLink = document.querySelector('.intro-secondary-link-map');
const btnTransparen = document.querySelector('.btn-transparen-scroll');


function scrollEl(content) {
  content = document.querySelector(content);

  const contentPosition = content.getBoundingClientRect().top;
  const secondaryPosition = contentPosition - 50

  window.scrollBy ({
    top: secondaryPosition,
    behavior: "smooth",
  })
}

if(secondaryLink) {
  secondaryLink.addEventListener('click', (e) => {
    e.preventDefault();
    scrollEl('.section-area-map')
  })
}

if(btnTransparen) {
  btnTransparen.addEventListener('click', (e) => {
    e.preventDefault()
    scrollEl('.connection__inner')
  })
}

