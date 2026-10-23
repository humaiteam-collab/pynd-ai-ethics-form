/* Email sign-in gate (Firebase email-link, passwordless). Hides the whole page until signed in. */
(function(){
  var cfg = window.FIREBASE_CONFIG || {};
  var acl = window.ALLOWED_ACCESS || {domains:[], emails:[]};
  var gate = document.getElementById('authGate');
  var msg = document.getElementById('authMsg');
  var emailIn = document.getElementById('authEmail');
  var sendBtn = document.getElementById('authSend');
  var outBtn = document.getElementById('authSignOut');

  function say(t, bad){ msg.textContent = t; msg.style.color = bad ? '#b3403a' : '#2f7a53'; }
  function allowed(email){
    email = String(email||'').trim().toLowerCase();
    if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return false;
    var d = (acl.domains||[]).map(function(x){return x.toLowerCase();});
    var e = (acl.emails||[]).map(function(x){return x.toLowerCase();});
    if(!d.length && !e.length) return true;
    return e.indexOf(email) >= 0 || d.indexOf(email.split('@')[1]) >= 0;
  }

  if(!cfg.apiKey || /^PASTE/.test(cfg.apiKey)){
    say('ยังไม่ได้ตั้งค่า Firebase (แก้ไฟล์ firebase-config.js)', true);
    sendBtn.disabled = true;
    return;
  }
  firebase.initializeApp(cfg);
  var auth = firebase.auth();

  function open(user){
    document.body.classList.add('authed');
    if(outBtn){ outBtn.textContent = 'ออกจากระบบ (' + user.email + ')'; }
  }
  function close(){ document.body.classList.remove('authed'); }

  sendBtn.addEventListener('click', function(){
    var email = emailIn.value.trim();
    if(!allowed(email)){ say('อีเมลนี้ไม่ได้รับอนุญาตให้ใช้งาน', true); return; }
    sendBtn.disabled = true;
    auth.sendSignInLinkToEmail(email, { url: location.origin + location.pathname, handleCodeInApp: true })
      .then(function(){
        try{ localStorage.setItem('emailForSignIn', email); }catch(e){}
        say('ส่งลิงก์เข้าสู่ระบบไปที่อีเมลแล้ว กรุณาเปิดลิงก์ในอีเมล (เช็กกล่องสแปมด้วย)');
      })
      .catch(function(e){ say('ส่งไม่สำเร็จ: ' + e.message, true); })
      .then(function(){ sendBtn.disabled = false; });
  });
  if(outBtn) outBtn.addEventListener('click', function(){ auth.signOut(); });

  // Returning from the emailed link
  if(auth.isSignInWithEmailLink(location.href)){
    var saved = ''; try{ saved = localStorage.getItem('emailForSignIn') || ''; }catch(e){}
    var email = saved || window.prompt('กรุณายืนยันอีเมลที่ใช้ขอลิงก์');
    if(email && allowed(email)){
      auth.signInWithEmailLink(email, location.href).then(function(){
        try{ localStorage.removeItem('emailForSignIn'); }catch(e){}
        history.replaceState(null, '', location.pathname);
      }).catch(function(e){ say('ลิงก์ไม่ถูกต้องหรือหมดอายุ: ' + e.message, true); });
    } else { say('อีเมลนี้ไม่ได้รับอนุญาตให้ใช้งาน', true); }
  }

  auth.onAuthStateChanged(function(user){
    if(user && allowed(user.email)) open(user);
    else { close(); if(user) auth.signOut(); }
  });
})();
