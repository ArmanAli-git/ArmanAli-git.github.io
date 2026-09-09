;(function () {
  'use strict'

  // ── Nav scroll ──
  const nav = document.getElementById('nav')
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40)
  }, { passive: true })

  // ── Mobile menu ──
  const navToggle = document.getElementById('navToggle')
  const menu = document.getElementById('menu')

  function setMenu(open) {
    navToggle.classList.toggle('open', open)
    menu.classList.toggle('open', open)
    navToggle.setAttribute('aria-expanded', String(open))
    menu.setAttribute('aria-hidden', String(!open))
    document.body.style.overflow = open ? 'hidden' : ''
  }

  navToggle.addEventListener('click', () => setMenu(!menu.classList.contains('open')))
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)))

  // ── Scroll-spy ──
  const sections = document.querySelectorAll('.section[id]')
  const spyLinks = document.querySelectorAll('.nav__links a')

  function spy() {
    const y = window.scrollY + 130
    let current = ''
    sections.forEach(s => { if (y >= s.offsetTop) current = s.id })
    spyLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + current))
  }
  window.addEventListener('scroll', spy, { passive: true })
  spy()

  // ── Typewriter ──
  const typer = document.getElementById('typewriter')
  const phrases = ['Desktop App Builder', 'Automation Specialist', 'Web Designer', 'Linux Enthusiast']
  let pi = 0, ci = 0, deleting = false

  if (typer) {
    ;(function tick() {
      const word = phrases[pi]
      if (!deleting) {
        ci++
        if (ci === word.length) {
          deleting = true
          typer.textContent = word
          setTimeout(tick, 1700)
          return
        }
      } else {
        ci--
        if (ci === 0) { deleting = false; pi = (pi + 1) % phrases.length }
      }
      typer.textContent = word.slice(0, ci)
      setTimeout(tick, deleting ? 42 : 95)
    })()
    // delay start for hero entrance
    typer.textContent = ''
    setTimeout(() => { pi = 0; ci = 0; deleting = false }, 1400)
  }

  // ── Smooth scroll ──
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const t = document.querySelector(a.getAttribute('href'))
      if (!t) return
      e.preventDefault()
      t.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  })

  // ── Scroll reveal (blur-in) ──
  const revealEls = document.querySelectorAll('.reveal')
  const revealObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => entry.target.classList.add('visible'))
        })
        revealObs.unobserve(entry.target)
      }
    })
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' })

  revealEls.forEach((el, i) => {
    el.style.transitionDelay = `${Math.min(i % 6, 3) * 0.07}s`
    revealObs.observe(el)
  })

  // ── Marquee pause on hover ──
  const marqueeTrack = document.querySelector('.marquee__track')
  const marquee = document.querySelector('.marquee')
  if (marquee && marqueeTrack) {
    marquee.addEventListener('mouseenter', () => { marqueeTrack.style.animationPlayState = 'paused' })
    marquee.addEventListener('mouseleave', () => { marqueeTrack.style.animationPlayState = 'running' })
  }

  // ── Magnetic buttons ──
  document.querySelectorAll('.magnetic').forEach(el => {
    const STR = 0.26
    el.addEventListener('mousemove', e => {
      const r = el.getBoundingClientRect()
      const dx = (e.clientX - r.left - r.width  / 2) * STR
      const dy = (e.clientY - r.top  - r.height / 2) * STR
      el.style.transform = 'translate(' + dx + 'px,' + dy + 'px)'
    })
    el.addEventListener('mouseleave', () => { el.style.transform = '' })
  })

  // ── 3D tilt on project cards ──
  document.querySelectorAll('.tilt').forEach(card => {
    const MAX = 6
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect()
      const x = (e.clientX - r.left) / r.width
      const y = (e.clientY - r.top)  / r.height
      card.style.transform =
        'perspective(900px) rotateX(' + ((0.5 - y) * MAX) + 'deg) rotateY(' + ((x - 0.5) * MAX) + 'deg) translateY(-6px)'
    })
    card.addEventListener('mouseleave', () => { card.style.transform = '' })
  })

  // ── Footer year ──
  const yearEl = document.getElementById('year')
  if (yearEl) yearEl.textContent = new Date().getFullYear()

})()
