/* ═══════════════════════════════════════════════════════
   Portfolio – Interactions & Animations
   ═══════════════════════════════════════════════════════ */

;(function () {
  'use strict'

  /* ─── Navbar Scroll Effect ─── */
  const nav = document.getElementById('nav')

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50)
  }, { passive: true })

  /* ─── Mobile Nav Toggle ─── */
  const navToggle = document.getElementById('navToggle')
  const navLinks  = document.getElementById('navLinks')

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('open')
    navLinks.classList.toggle('open')
  })

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('open')
      navLinks.classList.remove('open')
    })
  })

  /* ─── Scroll-Spy Active Nav ─── */
  const sections = document.querySelectorAll('.section[id], .hero[id]')

  function updateActiveNav() {
    const scrollY = window.scrollY + 120

    sections.forEach(section => {
      const top    = section.offsetTop
      const height = section.offsetHeight
      const id     = section.getAttribute('id')
      const link   = navLinks.querySelector(`a[href="#${id}"]`)

      if (link) {
        link.classList.toggle('active', scrollY >= top && scrollY < top + height)
      }
    })
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true })
  updateActiveNav()

  /* ─── Scroll Reveal (Intersection Observer) ─── */
  const revealElements = document.querySelectorAll('.reveal')
  const heroReveals    = document.querySelectorAll('.hero .reveal')

  // Hero elements animate in after a brief settle
  heroReveals.forEach((el, i) => {
    el.style.transitionDelay = `${0.15 + i * 0.12}s`
  })

  const revealObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Defer to next frame so the browser paints opacity:0 first,
          // giving the CSS transition something to animate from.
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              entry.target.classList.add('visible')
            })
          })
          revealObserver.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
  )

  // Non-hero elements get staggered delays
  revealElements.forEach((el, i) => {
    if (!el.closest('.hero')) {
      el.style.transitionDelay = `${(i % 6) * 0.07}s`
    }
    revealObserver.observe(el)
  })

  /* ─── Smooth Scroll for Anchor Links ─── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      e.preventDefault()
      const target = document.querySelector(anchor.getAttribute('href'))
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    })
  })

  /* ─── Footer Year ─── */
  const yearEl = document.getElementById('year')
  if (yearEl) yearEl.textContent = new Date().getFullYear()

  /* ═══════════════════════════════════════════════════════
     Magnetic Buttons
     ═══════════════════════════════════════════════════════ */
  const magneticEls = document.querySelectorAll('.magnetic')
  const MAG_STRENGTH = 0.3

  magneticEls.forEach(el => {
    el.addEventListener('mousemove', e => {
      const rect = el.getBoundingClientRect()
      const cx   = rect.left + rect.width / 2
      const cy   = rect.top + rect.height / 2
      const dx   = (e.clientX - cx) * MAG_STRENGTH
      const dy   = (e.clientY - cy) * MAG_STRENGTH

      el.style.transform = `translate(${dx}px, ${dy}px)`
    })

    el.addEventListener('mouseleave', () => {
      el.style.transform = 'translate(0, 0)'
    })
  })

  /* ═══════════════════════════════════════════════════════
     3D Tilt on Project Cards
     ═══════════════════════════════════════════════════════ */
  const tiltEls  = document.querySelectorAll('.tilt')
  const TILT_MAX = 8

  tiltEls.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect()
      const x    = (e.clientX - rect.left) / rect.width
      const y    = (e.clientY - rect.top)  / rect.height

      const rotateY = (x - 0.5) * TILT_MAX
      const rotateX = (0.5 - y) * TILT_MAX

      card.style.transform =
        `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`

      // Spotlight glow position
      card.style.setProperty('--mx', `${x * 100}%`)
      card.style.setProperty('--my', `${y * 100}%`)
    })

    card.addEventListener('mouseleave', () => {
      card.style.transform = ''
    })
  })

  /* ═══════════════════════════════════════════════════════
     Contact Link Spotlight
     ═══════════════════════════════════════════════════════ */
  const contactLinks = document.querySelectorAll('.contact-link')

  contactLinks.forEach(link => {
    link.addEventListener('mousemove', e => {
      const rect = link.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100

      link.style.background =
        `radial-gradient(circle 200px at ${x}% ${y}%, rgba(167, 139, 250, 0.07), transparent)`
    })

    link.addEventListener('mouseleave', () => {
      link.style.background = ''
    })
  })

})()
