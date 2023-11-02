//FOR SIGN UP 
const form1 = document.querySelector("#myForm1");
const signupbtn = form1.querySelector('#signup');
const usernameDiv1 = form1.querySelector('#usernameDiv1');
const successDiv1 = form1.querySelector('#successDiv1');
const passwordDiv1 = form1.querySelector('#passwordDiv1');
const Name = form1.querySelector('#Name');
const userName = form1.querySelector('#userName');
const password1 = form1.querySelector('#password1');
const password2 = form1.querySelector('#password2');
signupbtn.addEventListener('click', onSignup);
async function onSignup(e) {
    try {
        if (e.target && e.target.classList.contains("submit") && form1.checkValidity()) {
            e.preventDefault();
            if (password1.value != password2.value) {
                passwordDiv1.classList.remove('d-none');
                passwordDiv1.classList.add('d-block');
                setTimeout(() => {
                    passwordDiv1.classList.remove('d-block');
                    passwordDiv1.classList.add('d-none');
                }, 3000);
            } else {
                const data = {
                    Name: Name.value,
                    userName: userName.value,
                    password: password1.value,
                };
                const response = await axios.post("user/signup", data);
                successDiv1.classList.remove('d-none');
                successDiv1.classList.add('d-block');
                await new Promise((resolve) => {
                    setTimeout(() => {
                        successDiv1.classList.remove('d-block');
                        successDiv1.classList.add('d-none');
                        resolve();
                    }, 3000);
                });
                const userCredentials = await axios.post("user/signin", data);
                localStorage.setItem('token', JSON.stringify({ name: data.Name, token: userCredentials.data.token }));
                window.location.href = `user`;

            }
        }
    } catch (error) {
        if (error.response && error.response.status === 401) {
            e.preventDefault();
            console.log("Authentication failed. User is already exist.");
            usernameDiv1.classList.remove('d-none');
            usernameDiv1.classList.add('d-block');
            setTimeout(() => {
                usernameDiv1.classList.remove('d-block');
                usernameDiv1.classList.add('d-none');
            }, 3000);
        } else {
            console.error("An error occurred:", error);
        }
    }
}