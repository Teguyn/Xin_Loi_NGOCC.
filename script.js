/* ============================================================
   GỬI BÉ NGỌC CỦA ANH - INTERACTIVE LOGIC & EFFECTS
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const screenEnvelope = document.getElementById('screen-envelope');
  const screenContent = document.getElementById('screen-content');
  const envelopeTrigger = document.getElementById('envelope-trigger');
  
  const musicBtn = document.getElementById('music-btn');
  const discIcon = document.getElementById('disc-icon');
  
  const btnYes = document.getElementById('btn-yes');
  const btnNo = document.getElementById('btn-no');
  const actionsArena = document.getElementById('actions-arena');
  const begMessageBox = document.getElementById('beg-message-box');
  const begMessageText = document.getElementById('beg-message-text');
  
  const modalForgiven = document.getElementById('modal-forgiven');
  const btnReplyMessage = document.getElementById('btn-reply-message');
  const btnReplay = document.getElementById('btn-replay');
  
  const toastNotice = document.getElementById('toast-notice');
  const toastMsg = document.getElementById('toast-msg');

  // Begging phrases list (talking / crush stage)
  const beggingPhrases = [
    "Anh biết cái miệng anh nói nhanh hơn não làm Ngọc phiền lòng rồi mà 🥺",
    "Cho anh thêm một cơ hội để thể hiện lại sự tinh tế đi mò 🙏",
    "Đừng bơ tin nhắn của anh nữa nha, anh sợ mất cơ hội tìm hiểu Ngọc lắm 😭",
    "Năn nỉ Ngọc đó, anh mời ly trà sữa tạ lỗi liền nè 🧋",
    "Anh hứa từ nay sẽ nói chuyện chững chạc và tinh tế hơn x100 lần! ✨",
    "Nút này bị khoá gùi á, Ngọc bấm nút màu hồng tha lỗi cho anh đi mà 🌸",
    "Huhu anh đang hối hận lắm nè, đừng dỗi anh nữa mò! 🥺👉👈",
    "Ngọc tha lỗi cho anh nha, anh mời đi ăn một bữa tạ tội đàng hoàng luôn! 🍲"
  ];

  let rejectCount = 0;
  let isEnvelopeOpened = false;
  let isMusicPlaying = false;
  let audioContext = null;
  let synthInterval = null;

  /* ============================================================
     1. AUDIO SYSTEM (Synthesized Dreamy Music Box / Chimes)
     ============================================================ */
  function initAudioContext() {
    if (!audioContext) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        audioContext = new AudioCtx();
      }
    }
    if (audioContext && audioContext.state === 'suspended') {
      audioContext.resume();
    }
  }

  // Play a soft bell/kalimba tone
  function playNote(frequency, duration, timeOffset, type = 'sine') {
    if (!audioContext || audioContext.state !== 'running') return;
    try {
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(frequency, audioContext.currentTime + timeOffset);

      gain.gain.setValueAtTime(0.0001, audioContext.currentTime + timeOffset);
      gain.gain.exponentialRampToValueAtTime(0.18, audioContext.currentTime + timeOffset + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + timeOffset + duration);

      osc.connect(gain);
      gain.connect(audioContext.destination);

      osc.start(audioContext.currentTime + timeOffset);
      osc.stop(audioContext.currentTime + timeOffset + duration);
    } catch (e) {
      console.warn("Audio note play failed:", e);
    }
  }

  // Romantic Lullaby Arpeggio (C Major / A Minor Warm Harmony)
  const melodyNotes = [
    // Chords and arpeggios (Cmaj7 -> Am7 -> Fmaj7 -> G)
    { f: 523.25, d: 0.8 }, // C5
    { f: 659.25, d: 0.8 }, // E5
    { f: 783.99, d: 0.8 }, // G5
    { f: 987.77, d: 1.2 }, // B5
    { f: 440.00, d: 0.8 }, // A4
    { f: 523.25, d: 0.8 }, // C5
    { f: 659.25, d: 0.8 }, // E5
    { f: 880.00, d: 1.2 }, // A5
    { f: 349.23, d: 0.8 }, // F4
    { f: 440.00, d: 0.8 }, // A4
    { f: 523.25, d: 0.8 }, // C5
    { f: 698.46, d: 1.2 }, // F5
    { f: 392.00, d: 0.8 }, // G4
    { f: 493.88, d: 0.8 }, // B4
    { f: 587.33, d: 0.8 }, // D5
    { f: 783.99, d: 1.4 }, // G5
  ];

  let currentMelodyStep = 0;

  function startSynthesizerMusic() {
    initAudioContext();
    if (synthInterval) clearInterval(synthInterval);

    isMusicPlaying = true;
    musicBtn.classList.add('disc-playing');

    synthInterval = setInterval(() => {
      if (!isMusicPlaying) return;
      const note = melodyNotes[currentMelodyStep % melodyNotes.length];
      playNote(note.f, note.d, 0, 'sine');
      // Gentle bass resonance
      if (currentMelodyStep % 4 === 0) {
        playNote(note.f / 2, 1.4, 0, 'triangle');
      }
      currentMelodyStep++;
    }, 450);
  }

  function stopSynthesizerMusic() {
    isMusicPlaying = false;
    if (synthInterval) {
      clearInterval(synthInterval);
      synthInterval = null;
    }
    musicBtn.classList.remove('disc-playing');
  }

  function toggleMusic() {
    if (isMusicPlaying) {
      stopSynthesizerMusic();
    } else {
      startSynthesizerMusic();
    }
  }

  musicBtn.addEventListener('click', toggleMusic);

  // Sound effect for button clicks
  function playSparkleSound() {
    initAudioContext();
    if (!audioContext) return;
    [1046.50, 1318.51, 1567.98, 2093.00].forEach((freq, idx) => {
      playNote(freq, 0.35, idx * 0.08, 'sine');
    });
  }

  function playFunnyBoingSound() {
    initAudioContext();
    if (!audioContext) return;
    try {
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, audioContext.currentTime);
      osc.frequency.exponentialRampToValueAtTime(140, audioContext.currentTime + 0.25);
      gain.gain.setValueAtTime(0.2, audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.25);
      osc.connect(gain);
      gain.connect(audioContext.destination);
      osc.start();
      osc.stop(audioContext.currentTime + 0.25);
    } catch(e){}
  }

  /* ============================================================
     2. ENVELOPE OPENING
     ============================================================ */
  envelopeTrigger.addEventListener('click', () => {
    if (isEnvelopeOpened) return;
    isEnvelopeOpened = true;

    // Start background music
    startSynthesizerMusic();

    // Trigger sweet heart explosion
    triggerHeartExplosion();

    // Animation transition
    screenEnvelope.classList.add('opened');
    setTimeout(() => {
      screenEnvelope.style.display = 'none';
      screenContent.classList.add('active');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 600);
  });

  /* ============================================================
     3. REASONS CAROUSEL
     ============================================================ */
  const reasonItems = document.querySelectorAll('.reason-item');
  const reasonDots = document.querySelectorAll('.reasons-dots .dot');
  let currentReasonIndex = 0;
  let carouselTimer = null;

  window.switchReason = function(index) {
    reasonItems.forEach((el, i) => {
      el.classList.toggle('active', i === index);
    });
    reasonDots.forEach((el, i) => {
      el.classList.toggle('active', i === index);
    });
    currentReasonIndex = index;
  };

  function startCarouselTimer() {
    carouselTimer = setInterval(() => {
      currentReasonIndex = (currentReasonIndex + 1) % reasonItems.length;
      window.switchReason(currentReasonIndex);
    }, 4500);
  }
  startCarouselTimer();

  /* ============================================================
     4. COUPON CLAIMING
     ============================================================ */
  window.claimCoupon = function(button, message) {
    playSparkleSound();
    button.classList.add('claimed');
    button.innerHTML = '<span>Đã nhận ❤️</span>';
    
    // Mini confetti on the button
    const rect = button.getBoundingClientRect();
    if (window.confetti) {
      window.confetti({
        particleCount: 28,
        spread: 60,
        origin: {
          x: (rect.left + rect.width / 2) / window.innerWidth,
          y: (rect.top + rect.height / 2) / window.innerHeight
        },
        colors: ['#ff4d6d', '#ff758f', '#ffd166', '#fff']
      });
    }

    showToast(message);
  };

  function showToast(msg) {
    toastMsg.textContent = msg;
    toastNotice.classList.add('show');
    setTimeout(() => {
      toastNotice.classList.remove('show');
    }, 3200);
  }

  /* ============================================================
     5. THE PLAYFUL "HÔNG THA ĐÂU" BUTTON MECHANIC
     ============================================================ */
  function moveNoButton() {
    playFunnyBoingSound();
    rejectCount++;

    // Show Begging Message
    const phrase = beggingPhrases[(rejectCount - 1) % beggingPhrases.length];
    begMessageText.textContent = phrase;
    begMessageBox.classList.remove('hidden');

    // Make the YES button grow larger & more glowing
    const currentYesScale = 1 + Math.min(rejectCount * 0.12, 0.55);
    btnYes.style.transform = `scale(${currentYesScale})`;
    btnYes.style.boxShadow = `0 10px 30px rgba(255, 77, 109, ${0.35 + rejectCount * 0.08})`;

    // If user refuses more than 5 times, playfully disappear the NO button!
    if (rejectCount >= 6) {
      btnNo.style.transition = 'all 0.4s ease';
      btnNo.style.transform = 'scale(0) rotate(180deg)';
      btnNo.style.opacity = '0';
      btnNo.style.pointerEvents = 'none';

      begMessageText.textContent = "Nút 'Hông tha' đã tự động biến mất gùi! Ngọc cho anh một cơ hội sửa sai nhen 🥺🌸";
      
      btnYes.style.transform = 'scale(1.15)';
      btnYes.style.width = '100%';
      return;
    }

    // Calculate funny escape displacement within arena
    const arenaRect = actionsArena.getBoundingClientRect();
    const btnRect = btnNo.getBoundingClientRect();

    const maxMoveX = Math.min(130, (arenaRect.width - btnRect.width) / 2);
    const maxMoveY = 40;

    const randomX = (Math.random() - 0.5) * maxMoveX * 2;
    const randomY = (Math.random() - 0.5) * maxMoveY * 2;

    btnNo.style.transition = 'transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)';
    btnNo.style.transform = `translate(${randomX}px, ${randomY}px) scale(0.92)`;
  }

  // Both hover (desktop) and touch/click (mobile) trigger escape
  btnNo.addEventListener('mouseenter', moveNoButton);
  btnNo.addEventListener('touchstart', (e) => {
    e.preventDefault();
    moveNoButton();
  }, { passive: false });
  btnNo.addEventListener('click', (e) => {
    e.preventDefault();
    moveNoButton();
  });

  /* ============================================================
     6. THE YES BUTTON & CELEBRATION
     ============================================================ */
  btnYes.addEventListener('click', () => {
    triggerGrandCelebration();
  });

  function triggerGrandCelebration() {
    playSparkleSound();
    
    // Multi-stage confetti fireworks
    if (window.confetti) {
      // Fire 1
      window.confetti({
        particleCount: 80,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#ff4d6d', '#ff758f', '#ffccd5', '#ffd166', '#ffffff']
      });

      // Fire 2 from edges
      setTimeout(() => {
        window.confetti({
          particleCount: 50,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#ff4d6d', '#ffd166', '#a2d2ff']
        });
        window.confetti({
          particleCount: 50,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#ff4d6d', '#ffd166', '#cdb4db']
        });
      }, 250);

      // Fire 3
      setTimeout(() => {
        window.confetti({
          particleCount: 70,
          spread: 120,
          origin: { y: 0.4 },
          shapes: ['circle']
        });
      }, 500);
    }

    // Show modal celebration
    modalForgiven.classList.add('active');
  }

  // Reply message button (copy to clipboard & open share prompt)
  btnReplyMessage.addEventListener('click', () => {
    const defaultLoveMsg = "Tạm tha lỗi cho anh lần này đó nha! Từ nay mà còn ăn nói thiếu suy nghĩ, không tinh tế nữa là em nghỉ chơi luôn đấy! Mau mời trà sữa tạ lỗi đii! 🧋😋";
    
    if (navigator.clipboard) {
      navigator.clipboard.writeText(defaultLoveMsg).then(() => {
        showToast("Đã sao chép tin nhắn ngọt ngào! Mau gửi cho anh nha 💌");
      }).catch(() => {
        showToast("Em nhớ bắt đền anh chầu trà sữa nha! 🧋");
      });
    } else {
      showToast("Em nhớ bắt đền anh chầu trà sữa nha! 🧋");
    }

    // Try opening messenger or sms fallback
    setTimeout(() => {
      // If user has messenger or zalo, prompt them
      const encoded = encodeURIComponent(defaultLoveMsg);
      // Fallback intent or alert
      alert(`💌 Bé Ngọc đã sẵn sàng gửi tin nhắn:\n\n"${defaultLoveMsg}"\n\nHãy dán vào tin nhắn gửi cho anh iu nha!`);
    }, 400);
  });

  // Replay button inside modal
  btnReplay.addEventListener('click', () => {
    modalForgiven.classList.remove('active');
    triggerHeartExplosion();
  });

  function triggerHeartExplosion() {
    if (window.confetti) {
      window.confetti({
        particleCount: 60,
        spread: 80,
        origin: { y: 0.5 },
        colors: ['#ff4d6d', '#ff758f', '#ffccd5']
      });
    }
  }

  /* ============================================================
     7. AMBIENT CANVAS (SAKURA PETALS & GLOWING HEARTS)
     ============================================================ */
  const canvas = document.getElementById('ambient-canvas');
  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];

  function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  class AmbientParticle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * width;
      this.y = -20;
      this.size = Math.random() * 10 + 8;
      this.speedY = Math.random() * 1.2 + 0.8;
      this.speedX = Math.sin(Math.random() * Math.PI) * 0.8 + (Math.random() - 0.5) * 0.4;
      this.rotation = Math.random() * 360;
      this.rotationSpeed = (Math.random() - 0.5) * 1.5;
      this.opacity = Math.random() * 0.5 + 0.35;
      this.type = Math.random() > 0.4 ? 'petal' : 'heart';
    }

    update() {
      this.y += this.speedY;
      this.x += this.speedX + Math.sin(this.y * 0.02) * 0.5;
      this.rotation += this.rotationSpeed;

      if (this.y > height + 20 || this.x < -20 || this.x > width + 20) {
        this.reset();
      }
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate((this.rotation * Math.PI) / 180);
      ctx.globalAlpha = this.opacity;

      if (this.type === 'petal') {
        // Draw soft sakura petal
        ctx.fillStyle = '#ffb3c1';
        ctx.beginPath();
        ctx.ellipse(0, 0, this.size, this.size * 0.55, Math.PI / 4, 0, 2 * Math.PI);
        ctx.fill();
      } else {
        // Draw mini pink heart
        ctx.fillStyle = '#ff758f';
        const s = this.size * 0.6;
        ctx.beginPath();
        ctx.moveTo(0, s * 0.3);
        ctx.bezierCurveTo(-s, -s * 0.6, -s * 1.2, s * 0.3, 0, s * 1.1);
        ctx.bezierCurveTo(s * 1.2, s * 0.3, s, -s * 0.6, 0, s * 0.3);
        ctx.fill();
      }

      ctx.restore();
    }
  }

  // Populate particles
  const particleCount = window.innerWidth < 600 ? 24 : 45;
  for (let i = 0; i < particleCount; i++) {
    const p = new AmbientParticle();
    p.y = Math.random() * height; // initial random spread
    particles.push(p);
  }

  function renderAmbient() {
    ctx.clearRect(0, 0, width, height);
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
    }
    requestAnimationFrame(renderAmbient);
  }
  renderAmbient();

  /* Touch / Pointer Sparkles Trail Effect */
  window.addEventListener('pointermove', (e) => {
    if (Math.random() > 0.65) {
      createSparkle(e.clientX, e.clientY);
    }
  });

  function createSparkle(x, y) {
    const spark = document.createElement('div');
    spark.style.position = 'fixed';
    spark.style.left = `${x}px`;
    spark.style.top = `${y}px`;
    spark.style.width = '6px';
    spark.style.height = '6px';
    spark.style.background = '#ff758f';
    spark.style.borderRadius = '50%';
    spark.style.boxShadow = '0 0 10px #ff4d6d, 0 0 16px #ffd166';
    spark.style.pointerEvents = 'none';
    spark.style.zIndex = '9999';
    spark.style.transform = 'translate(-50%, -50%)';
    spark.style.transition = 'all 0.6s ease-out';
    document.body.appendChild(spark);

    requestAnimationFrame(() => {
      spark.style.transform = `translate(${(Math.random() - 0.5) * 30 - 3}px, ${(Math.random() - 0.5) * 30 - 3}px) scale(0)`;
      spark.style.opacity = '0';
    });

    setTimeout(() => {
      spark.remove();
    }, 600);
  }
});
