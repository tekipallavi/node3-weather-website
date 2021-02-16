
const form  =  document.querySelector('form');
const input =  document.querySelector('input');
const message = document.querySelector('.message');
const loader = document.querySelector('.loader');
console.log("tried to create branch and test");

form.addEventListener('submit', event => {
    event.preventDefault();
    message.textContent = '';
    loader.textContent = 'Fetching forecast.....';
    const location = input.value;
    fetch('/weather?address='+location).then(response => {
        response.json().then(data => {
        if(data.error){
            loader.textContent = '';
            message.textContent = data.error;
        }else{
            loader.textContent = '';
            message.textContent = 'LOCATION: '+data.location+'. FORECAST:  '+data.forecast; 
            console.log(data.location);
            console.log(data.forecast)
        }
  });
});
})