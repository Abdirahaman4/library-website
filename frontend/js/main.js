// Hel container-ka guud ee foomamka login/register
const container = document.getElementById('authContainer');

// Hel badhannada muujinta foomamka
const showSignUp = document.getElementById('showSignUp');
const showSignIn = document.getElementById('showSignIn');

// Marka la riixo Sign Up, ku dar class 'active' si Sign Up uu u muuqdo
showSignUp.addEventListener('click', () => container.classList.add('active'));

// Marka la riixo Sign In, ka saar class 'active' si Sign In uu u muuqdo
showSignIn.addEventListener('click', () => container.classList.remove('active'));

// 🔹 Muujinta/qarinta password-ka
function togglePassword(inputId, iconId) {
  const input = document.getElementById(inputId); // hel input-ka password
  const icon = document.getElementById(iconId);   // hel icon-ka
  icon.addEventListener('click', () => {
    // Haddii password-ku yahay "password" beddel text, haddii kale ku noqdo password
    input.type = input.type === 'password' ? 'text' : 'password';
  });
}

// Wac togglePassword foomka Register iyo Login
togglePassword('password', 'togglePass');
togglePassword('loginPassword', 'toggleLoginPass');

// 🔹 Diiwaangelinta isticmaalaha cusub
document.getElementById('registerForm').addEventListener('submit', async (e) => {
  e.preventDefault(); // Jooji submit-ka caadiga ah si boggu u reload garaynin

  // Qaado qiimaha laga soo galay foomka
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  // const role = document.getElementById('role').value;

  // Dir xogta server-ka API-ga
  const res = await fetch('http://localhost:3000/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password})
  });

  // Hel jawaabta server-ka
  const data = await res.json();

  // Tus fariinta diiwaangelinta
  document.getElementById('registerMessage').innerText = data.message;
});

// 🔹 Gelitaanka isticmaalaha (Login)
document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault(); // Jooji submit-ka caadiga ah

  // Qaado qiimaha laga soo galay foomka
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  // Dir xogta server-ka API-ga
  const res = await fetch('http://localhost:3000/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  // Hel jawaabta server-ka
  const data = await res.json();

  // Tus fariinta login-ka
  document.getElementById('loginMessage').innerText = data.message;

  // Haddii login-gu uu guuleysto, keydi token iyo role gudaha localStorage
  if (res.ok) {
    localStorage.setItem('token', data.token);
    localStorage.setItem('role', data.role);

    // Ku jiho bog gaar ah iyadoo ku xiran doorka isticmaalaha
    if (data.role === 'admin') {
      window.location.href = './admin.html'; // Admin
    } else {
      window.location.href = './home.html';  // User caadi
    }
  }
});
