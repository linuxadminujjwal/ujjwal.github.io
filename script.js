// ===== MOBILE MENU TOGGLE =====
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
    navMenu.style.position = 'absolute';
    navMenu.style.top = '100%';
    navMenu.style.left = '0';
    navMenu.style.right = '0';
    navMenu.style.flexDirection = 'column';
    navMenu.style.background = 'var(--card-bg)';
    navMenu.style.padding = '2rem';
    navMenu.style.gap = '1rem';
});

// Close menu when nav link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.style.display = 'none';
    });
});

// ===== SCROLL ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeIn 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.skill-category, .timeline-content, .stat-card').forEach(element => {
    observer.observe(element);
});

// ===== CONTACT FORM HANDLING =====
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Validate form
    if (!name || !email || !subject || !message) {
        showFormMessage('Please fill in all fields', 'error');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showFormMessage('Please enter a valid email', 'error');
        return;
    }
    
    // Simulate form submission (in production, send to backend)
    console.log('Form submitted:', { name, email, subject, message });
    
    // Show success message
    showFormMessage('Message sent successfully! I will get back to you soon.', 'success');
    
    // Reset form
    contactForm.reset();
    
    // Optional: Send to email using EmailJS or similar service
    // sendEmailViaService(name, email, subject, message);
});

function showFormMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = type;
    formMessage.style.display = 'block';
    
    setTimeout(() => {
        formMessage.style.display = 'none';
    }, 5000);
}

// ===== PRINT RESUME =====
function printResume() {
    window.print();
}

// ===== DOWNLOAD RESUME AS PDF =====
function downloadResume() {
    const resumeContent = document.querySelector('.resume-content');
    const element = document.createElement('div');
    element.innerHTML = resumeContent.innerHTML;
    
    // Create a simple text-based PDF (for production, use a library like html2pdf)
    const text = `
UJJWAL TRIPATHI
Linux Administrator & Cloud Infrastructure Specialist

Email: tripathiujjwal0802@gmail.com
Location: Gurgaon, India

PROFESSIONAL SUMMARY
Experienced Linux Administrator with expertise in managing and optimizing Linux-based systems, 
virtualization platforms, and cloud infrastructure.

TECHNICAL SKILLS
Operating Systems: RHEL 7/8, SUSE, Ubuntu
Virtualization: VMware vCenter, ESXi
Storage & File Systems: LVM, RAID, SAN (VSP), NFS, Samba
Administration: OS Installation, Patching, Upgrades, Apache, iSCSI, OS Hardening
Automation & Scripting: Ansible, Bash
Monitoring & Tools: CheckMK, NNMi, vROps, Storage Navigator, Smax
Networking: SSH, ACLs, CCNA Fundamentals
Version Control: Git

PROFESSIONAL EXPERIENCE
Linux Administrator
SmartX Technologies - Present

• Manage and optimize Linux-based systems and infrastructure
• Implement automation solutions using Ansible
• Monitor system performance using CheckMK and vROps
• Handle virtualization and storage management
• Implement OS hardening and security compliance

CERTIFICATIONS & CONTINUOUS LEARNING
• RHEL System Administration
• VMware Virtualization
• Ansible Automation
• CCNA Fundamentals
    `;
    
    // Create download link
    const element_link = document.createElement('a');
    element_link.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element_link.setAttribute('download', 'Ujjwal_Tripathi_Resume.txt');
    element_link.style.display = 'none';
    document.body.appendChild(element_link);
    element_link.click();
    document.body.removeChild(element_link);
    
    showFormMessage('Resume downloaded successfully!', 'success');
}

// ===== SMOOTH SCROLL ENHANCEMENT =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== ACTIVE NAV LINK INDICATOR =====
window.addEventListener('scroll', () => {
    let current = '';
    
    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.style.color = 'var(--primary-color)';
            link.style.textShadow = '0 0 10px var(--primary-color)';
        } else {
            link.style.color = 'var(--text-light)';
            link.style.textShadow = 'none';
        }
    });
});

// ===== TYPING ANIMATION FOR HERO TEXT =====
const heroTitle = document.querySelector('.hero-title');
const originalText = heroTitle.textContent;
let index = 0;

function typeWriter() {
    if (index < originalText.length) {
        heroTitle.textContent = originalText.substring(0, index + 1);
        index++;
        setTimeout(typeWriter, 50);
    }
}

// Start typing animation when page loads
window.addEventListener('load', () => {
    typeWriter();
});

// ===== PARALLAX EFFECT FOR CLOUDS =====
document.addEventListener('scroll', () => {
    const clouds = document.querySelectorAll('.cloud');
    const scrollPosition = window.scrollY;
    
    clouds.forEach((cloud, index) => {
        const speed = 0.5 + (index * 0.1);
        cloud.style.transform = `translateY(${scrollPosition * speed}px)`;
    });
});

// ===== ADD LOADING ANIMATION =====
window.addEventListener('load', () => {
    document.body.style.animation = 'fadeIn 0.6s ease';
});

// ===== TERMINAL TEXT ANIMATION =====
const terminalLines = document.querySelectorAll('.terminal-content p');
terminalLines.forEach((line, index) => {
    line.style.animation = `fadeIn 0.6s ease ${index * 0.2}s both`;
});

// ===== SKILL TAGS HOVER EFFECT =====
document.querySelectorAll('.skill-tag').forEach(tag => {
    tag.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1) rotate(5deg)';
    });
    
    tag.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) rotate(0deg)';
    });
});

console.log('Portfolio website loaded successfully! ✨');
