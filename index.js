// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initGreetingModal();
  initTypingEffect();
  initParticles();
  initConsoleTabs();
  initMobileMenu();
  initScrollAnimations();
  initProjectFilters();
  initCodeInspector();
  initContactForm();
});

/* ==========================================================================
   1. Theme Management (Light / Dark)
   ========================================================================== */
function initTheme() {
  const themeToggleBtn = document.getElementById("theme-toggle");
  const body = document.body;

  // Retrieve theme preference from localStorage, default to dark
  const savedTheme = localStorage.getItem("portfolioTheme") || "dark";
  body.setAttribute("data-theme", savedTheme);
  updateThemeIcon(savedTheme);

  themeToggleBtn.addEventListener("click", () => {
    const currentTheme = body.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    
    body.setAttribute("data-theme", newTheme);
    localStorage.setItem("portfolioTheme", newTheme);
    updateThemeIcon(newTheme);
  });
}

function updateThemeIcon(theme) {
  const themeToggleBtn = document.getElementById("theme-toggle");
  const icon = themeToggleBtn.querySelector("i");
  if (theme === "light") {
    icon.className = "fas fa-moon";
  } else {
    icon.className = "fas fa-sun";
  }
}

/* ==========================================================================
   2. Personalization & Greeting Modal Flow
   ========================================================================== */
function initGreetingModal() {
  const greetingModal = document.getElementById("greeting-modal");
  const nameInput = document.getElementById("visitor-name-input");
  const saveBtn = document.getElementById("visitor-save-btn");
  const skipBtn = document.getElementById("visitor-skip-btn");
  const welcomeTextEl = document.getElementById("welcomeText");

  // Retrieve name from localStorage
  let viewerName = localStorage.getItem("viewerName");

  if (viewerName) {
    updateWelcomeText(viewerName);
  } else {
    // If no name is saved, show the greeting modal after 1.5 seconds
    setTimeout(() => {
      greetingModal.classList.add("active");
      nameInput.focus();
    }, 1500);
  }

  saveBtn.addEventListener("click", () => {
    const name = nameInput.value.trim();
    if (name) {
      localStorage.setItem("viewerName", name);
      updateWelcomeText(name);
      greetingModal.classList.remove("active");
    } else {
      nameInput.focus();
    }
  });

  // Allow pressing Enter to save name
  nameInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      saveBtn.click();
    }
  });

  skipBtn.addEventListener("click", () => {
    localStorage.setItem("viewerName", "Guest");
    updateWelcomeText("Guest");
    greetingModal.classList.remove("active");
  });
}

function updateWelcomeText(name) {
  const welcomeTextEl = document.getElementById("welcomeText");
  if (welcomeTextEl) {
    welcomeTextEl.innerHTML = `DEAR <strong>${name.toUpperCase()}</strong>, WELCOME TO MY PORTFOLIO`;
  }
}

/* ==========================================================================
   3. Typing Effect in Hero Section
   ========================================================================== */
function initTypingEffect() {
  const words = ["Computer Systems", "High-Performance Software", "Interactive Web Apps", "Robust Solutions"];
  const typingTextEl = document.getElementById("typing-text");
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
    if (!typingTextEl) return;
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
      typingTextEl.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50; // faster deletion
    } else {
      typingTextEl.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100; // normal typing speed
    }

    if (!isDeleting && charIndex === currentWord.length) {
      // Pause at full word
      isDeleting = true;
      typingSpeed = 2000; // 2 seconds delay before deleting
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typingSpeed = 500; // delay before starting next word
    }

    setTimeout(type, typingSpeed);
  }

  // Start typing loop
  setTimeout(type, 1000);
}

/* ==========================================================================
   4. Lightweight Custom Particles Background
   ========================================================================== */
function initParticles() {
  const container = document.getElementById("particles-bg");
  if (!container) return;

  const particleCount = 25;
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("span");
    particle.className = "particle";
    
    // Randomize properties using CSS custom properties
    const size = Math.floor(Math.random() * 6) + 3; // 3px to 8px
    const duration = Math.floor(Math.random() * 20) + 15; // 15s to 35s
    const delay = Math.floor(Math.random() * 15); // 0s to 15s delay
    const left = Math.floor(Math.random() * 100); // 0% to 100%
    const top = Math.floor(Math.random() * 100); // 0% to 100%
    
    particle.style.setProperty("--p-size", `${size}px`);
    particle.style.setProperty("--p-duration", `${duration}s`);
    particle.style.setProperty("--p-delay", `${delay}s`);
    particle.style.setProperty("--p-left", `${left}%`);
    particle.style.setProperty("--p-top", `${top}%`);
    
    // Mix and match primary / secondary theme colors for particles
    if (Math.random() > 0.5) {
      particle.style.backgroundColor = "var(--color-secondary)";
    }
    
    container.appendChild(particle);
  }
}

/* ==========================================================================
   5. Interactive Console Tab Switcher
   ========================================================================== */
function initConsoleTabs() {
  const tabs = document.querySelectorAll(".console-tab");
  
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      const activeTabId = tab.getAttribute("data-tab");
      
      // Toggle active states on tabs
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      
      // Hide all content containers
      document.querySelectorAll(".tab-content").forEach(content => {
        content.style.display = "none";
      });
      
      // Show matching content
      const matchingContent = document.getElementById(`tab-${activeTabId}`);
      if (matchingContent) {
        matchingContent.style.display = "block";
      }
    });
  });
}

/* ==========================================================================
   6. Mobile Menu & Navigation Smooth Scroll
   ========================================================================== */
function initMobileMenu() {
  const toggleBtn = document.getElementById("mobile-menu-toggle");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  if (!toggleBtn || !navMenu) return;

  toggleBtn.addEventListener("click", () => {
    navMenu.classList.toggle("mobile-active");
    const isOpened = navMenu.classList.contains("mobile-active");
    toggleBtn.querySelector("i").className = isOpened ? "fas fa-times" : "fas fa-bars";
  });

  // Close mobile menu when nav link is clicked
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("mobile-active");
      toggleBtn.querySelector("i").className = "fas fa-bars";
    });
  });
}

/* ==========================================================================
   7. Scroll Reveal, Counters, and Active Link Highlighting
   ========================================================================== */
function initScrollAnimations() {
  const revealElements = document.querySelectorAll(".reveal-element");
  const navLinks = document.querySelectorAll(".nav-link");
  const skillProgresses = document.querySelectorAll(".skill-progress");
  const statNumbers = document.querySelectorAll(".stat-number");
  
  let statsAnimated = false;
  let skillsAnimated = false;

  // Intersection Observer for scroll-reveal fade-ins
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        
        // Trigger specific animations if their section is revealed
        if (entry.target.classList.contains("about-stats") && !statsAnimated) {
          animateStats();
          statsAnimated = true;
        }
        if (entry.target.classList.contains("skills-category") && !skillsAnimated) {
          animateSkills();
          skillsAnimated = true;
        }
      }
    });
  }, { threshold: 0.15 });

  revealElements.forEach(el => revealObserver.observe(el));

  // Intersection Observer for Active Navigation Highlighting
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navLinks.forEach(link => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active");
          }
        });
      }
    });
  }, { threshold: 0.4 });

  document.querySelectorAll("main > section").forEach(section => {
    sectionObserver.observe(section);
  });

  // Count-up animation for stats
  function animateStats() {
    statNumbers.forEach(num => {
      const target = parseInt(num.getAttribute("data-target"), 10);
      const duration = 2000; // 2 seconds
      const stepTime = Math.abs(Math.floor(duration / target));
      let current = 0;
      
      const timer = setInterval(() => {
        current += Math.ceil(target / 100) || 1;
        if (current >= target) {
          num.textContent = target + "+";
          clearInterval(timer);
        } else {
          num.textContent = current + "+";
        }
      }, Math.max(stepTime, 20));
    });
  }

  // Width filling animation for skill bars
  function animateSkills() {
    skillProgresses.forEach(bar => {
      const width = bar.getAttribute("data-width");
      bar.style.width = width;
    });
  }
}

/* ==========================================================================
   8. Portfolio Project Filtering
   ========================================================================== */
function initProjectFilters() {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      // Toggle button states
      filterButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const filterVal = btn.getAttribute("data-filter");

      projectCards.forEach(card => {
        const category = card.getAttribute("data-category");
        if (filterVal === "all" || category === filterVal) {
          card.style.display = "flex";
          setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "scale(1)";
          }, 50);
        } else {
          card.style.opacity = "0";
          card.style.transform = "scale(0.9)";
          setTimeout(() => {
            card.style.display = "none";
          }, 300);
        }
      });
    });
  });
}

/* ==========================================================================
   9. Interactive Code Inspector Console (Modal)
   ========================================================================== */
function initCodeInspector() {
  const modal = document.getElementById("code-inspector-modal");
  const closeBtn = document.getElementById("code-modal-close-btn");
  const titleSpan = document.getElementById("code-modal-project-name");
  const codePane = document.getElementById("code-inspector-pane");
  const inspectButtons = document.querySelectorAll(".inspect-btn");

  if (!modal || !closeBtn || !titleSpan || !codePane) return;

  // Simulated codebases for Elie's projects
  const mockCodebases = {
    iot_tracker: `// IoT Tracking Device - Telemetry and GPS Logger (C++)
#include <HardwareSerial.h>
#include <TinyGPS++.h>

#define CELLULAR_RX 16
#define CELLULAR_TX 17
#define SLEEP_INTERVAL_SEC 60

TinyGPSPlus gps;
HardwareSerial cellSerial(2); // ESP32 UART2

void setup() {
    Serial.begin(115200);
    cellSerial.begin(9600, SERIAL_8N1, CELLULAR_RX, CELLULAR_TX);
    initializeGPRS();
}

void loop() {
    while (Serial.available() > 0) {
        if (gps.encode(Serial.read())) {
            if (gps.location.isUpdated()) {
                transmitTelemetry(gps.location.lat(), gps.location.lng());
                enterDeepSleep();
            }
        }
    }
}

void transmitTelemetry(double lat, double lng) {
    cellSerial.println("AT+HTTPINIT");
    delay(100);
    cellSerial.printf("AT+HTTPPARA=\\"URL\\",\\"http://elie.dev/api/track?lat=%.6f&lng=%.6f\\"\\r\\n", lat, lng);
    delay(100);
    cellSerial.println("AT+HTTPACTION=0"); // HTTP GET
}

void enterDeepSleep() {
    Serial.println("Entering Deep Sleep Mode...");
    esp_sleep_enable_timer_wakeup(SLEEP_INTERVAL_SEC * 1000000ULL);
    esp_deep_sleep_start();
}`,
    bms: `<?php
// Bar Management System (BMS) - Stock Order Controller (PHP/MySQL)
class StockController {
    private PDO $db;

    public function __construct(PDO $connection) {
        $this->db = $connection;
    }

    public function recordSale(int $itemId, int $quantity, float $price): bool {
        $this->db->beginTransaction();
        try {
            // Check stock level first
            $stmt = $this->db->prepare("SELECT stock_qty FROM inventory WHERE id = :id FOR UPDATE");
            $stmt->execute([':id' => $itemId]);
            $currentStock = $stmt->fetchColumn();

            if ($currentStock < $quantity) {
                throw new Exception("Insufficient stock inventory for transaction.");
            }

            // Deduct stock
            $update = $this->db->prepare("UPDATE inventory SET stock_qty = stock_qty - :qty WHERE id = :id");
            $update->execute([':qty' => $quantity, ':id' => $itemId]);

            // Log sales transaction record
            $log = $this->db->prepare("INSERT INTO transactions (item_id, qty, amount, sold_at) VALUES (:id, :qty, :amount, NOW())");
            $log->execute([':id' => $itemId, ':qty' => $quantity, ':amount' => $price * $quantity]);

            $this->db->commit();
            return true;
        } catch (Exception $e) {
            $this->db->rollBack();
            error_log("Sale failed: " . $e->getMessage());
            return false;
        }
    }
}`,
    youth_guard: `# Youth Guard Safety Hub - Twilio Alert Views (Django/Python)
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from twilio.rest import Client
from .models import SecurityAlert, EmergencyContact

class EmergencyAlertView(APIView):
    def post(self, request):
        user = request.user
        latitude = request.data.get('latitude')
        longitude = request.data.get('longitude')
        
        # Save alert coordinates locally
        alert = SecurityAlert.objects.create(
            user=user, latitude=latitude, longitude=longitude, status="ACTIVE"
        )
        
        # Pull emergencies list and broadcast SMS alerts via Twilio
        contacts = EmergencyContact.objects.filter(user=user)
        client = Client("TWILIO_ACCOUNT_SID", "TWILIO_AUTH_TOKEN")
        
        alert_message = f"EMERGENCY: {user.username} has triggered YouthGuard alert. Location: http://maps.google.com/?q={latitude},{longitude}"
        
        for contact in contacts:
            client.messages.create(
                body=alert_message,
                from_="+1234567890",
                to=contact.phone_number
            )
            
        return Response({"status": "Alert broadcast completed successfully"}, status=status.HTTP_201_CREATED)
`,
    awareness_hub: `// SaF56 Cyber Awareness Hub - Phishing Threat Analyzer (JavaScript)
class PhishingAnalyzer {
    constructor() {
        this.threatKeywords = ['urgent', 'password reset', 'bank', 'suspended', 'verify account'];
    }

    analyzeEmailHeaders(subject, body, senderDomain) {
        let riskScore = 0;
        const normalizedSubject = subject.toLowerCase();

        // 1. Check sender domains for spoofing signatures
        if (senderDomain.endsWith('secure-bank-reset.com') || senderDomain.includes('support-update')) {
            riskScore += 45;
        }

        // 2. Keyword check
        this.threatKeywords.forEach(keyword => {
            if (normalizedSubject.includes(keyword) || body.toLowerCase().includes(keyword)) {
                riskScore += 15;
            }
        });

        // 3. Link parsing
        if (body.includes('href=') && !body.includes('https://')) {
            riskScore += 25; // Unencrypted URL redirections
        }

        return {
            isPhishing: riskScore >= 50,
            score: Math.min(riskScore, 100),
            level: riskScore >= 75 ? 'CRITICAL' : (riskScore >= 40 ? 'WARNING' : 'LOW')
        };
    }
}`,
    sms: `// Student Management System (SMS) - JTable Model Loader (Java)
package com.elie.sms.controller;

import java.sql.*;
import java.util.Vector;
import javax.swing.table.DefaultTableModel;

public class StudentDatabaseController {
    private static final String URL = "jdbc:mysql://localhost:3306/sms_db";
    private static final String USER = "root";
    private static final String PASS = "";

    public DefaultTableModel loadStudentRecords() {
        Vector<String> columnNames = new Vector<>();
        columnNames.add("ID");
        columnNames.add("Names");
        columnNames.add("Email");
        columnNames.add("Course");
        columnNames.add("Marks");

        Vector<Vector<Object>> data = new Vector<>();
        String sql = "SELECT id, name, email, course, marks FROM students";

        try (Connection conn = DriverManager.getConnection(URL, USER, PASS);
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery(sql)) {

            while (rs.next()) {
                Vector<Object> vector = new Vector<>();
                vector.add(rs.getInt("id"));
                vector.add(rs.getString("name"));
                vector.add(rs.getString("email"));
                vector.add(rs.getString("course"));
                vector.add(rs.getInt("marks"));
                data.add(vector);
            }
        } catch (SQLException e) {
            System.err.println("JDBC database error: " + e.getMessage());
        }

        return new DefaultTableModel(data, columnNames);
    }
}`,
    restaurant_sys: `<?php
// Restaurant Management System - Order Queue Billing Controller (PHP/MySQL)
namespace Elie\\Restaurant;

use PDO;

class BillingManager {
    private PDO $db;

    public function __construct(PDO $db) {
        $this->db = $db;
    }

    public function generateBill(int $tableId): array {
        $query = "SELECT m.name, m.price, o.quantity 
                  FROM orders o 
                  JOIN menu m ON o.menu_id = m.id 
                  WHERE o.table_id = :table_id AND o.status = 'DELIVERED'";
                  
        $stmt = $this->db->prepare($query);
        $stmt->execute([':table_id' => $tableId]);
        $orders = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $subtotal = 0.0;
        foreach ($orders as $order) {
            $subtotal += ($order['price'] * $order['quantity']);
        }

        $tax = $subtotal * 0.18; // 18% VAT
        $total = $subtotal + $tax;

        return [
            'orders' => $orders,
            'subtotal' => round($subtotal, 2),
            'tax' => round($tax, 2),
            'total' => round($total, 2)
        ];
    }
}`,
    bdc_web: `# BDC Corporate Portal - Application View (Django/Python)
from django.shortcuts import render, redirect
from django.views import View
from .models import BusinessApplication
from .forms import ApplicationForm

class BusinessApplicationView(View):
    def get(self, request):
        form = ApplicationForm()
        return render(request, 'bdc/apply.html', {'form': form})

    def post(self, request):
        form = ApplicationForm(request.POST, request.FILES)
        if form.is_valid():
            # Process application files and save to database
            application = form.save(commit=False)
            application.applicant = request.user
            application.status = 'PENDING'
            application.save()
            return redirect('application_success')
            
        return render(request, 'bdc/apply.html', {'form': form})
`,
    question_solve: `// Question-Solve Engine - Dynamic Recursion Solver (Java)
package com.elie.algorithms;

import java.util.HashMap;
import java.util.Map;

public class DynamicFibonacciSolver {
    private final Map<Integer, Long> memo = new HashMap<>();

    public long solve(int n) {
        if (n < 0) throw new IllegalArgumentException("Index cannot be negative.");
        if (n == 0) return 0;
        if (n == 1) return 1;

        if (memo.containsKey(n)) {
            return memo.get(n);
        }

        long result = solve(n - 1) + solve(n - 2);
        memo.put(n, result);
        return result;
    }

    public void benchmarkSolver(int n) {
        long startTime = System.nanoTime();
        long result = solve(n);
        long endTime = System.nanoTime();
        
        System.out.printf("Fibonacci(%d) = %d%n", n, result);
        System.out.printf("Execution time: %.4f milliseconds.%n", (endTime - startTime) / 1e6);
    }
}`
  };

  inspectButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const projectKey = btn.getAttribute("data-project");
      const code = mockCodebases[projectKey];
      const titles = {
        iot_tracker: "IoT Tracker GPS Telemetry (C++)",
        bms: "Bar Management System Controller (PHP/MySQL)",
        youth_guard: "Youth Guard Alert Dispatch (Django/Python)",
        awareness_hub: "SaF56 Phishing Analyzer (JavaScript)",
        sms: "Student DB Swing Controller (Java)",
        restaurant_sys: "Restaurant Billing Queue (PHP/MySQL)",
        bdc_web: "BDC Applicant Portal (Django/Python)",
        question_solve: "Question-Solve Benchmarker (Java)"
      };

      if (code) {
        // Escapes HTML special chars inside the code block
        codePane.textContent = code;
        titleSpan.textContent = titles[projectKey] || "Source Code";
        modal.classList.add("active");
      }
    });
  });

  const closeModal = () => modal.classList.remove("active");

  closeBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });
  
  // ESC key press to close code inspector
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      closeModal();
    }
  });
}

/* ==========================================================================
   10. Contact Form Submissions with Interactive Feedback (Live Backend Connection)
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const submitBtn = form.querySelector("button[type='submit']");
    
    // Explicitly targeting inputs via their synchronized HTML 'name' attribute
    const nameInput = form.querySelector("input[name='name']");
    const name = nameInput ? nameInput.value.trim() : "";
    
    // UI state indicator: Sending...
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `Sending... <i class="fas fa-spinner fa-spin"></i>`;
    
    // EmailJS production credentials setup
    const serviceID = 'service_g5t3rm4';   // Service ID
    const templateID = 'template_e0k51d5'; // Template ID
    
    // Transmit data natively using the HTML Form Element
    emailjs.sendForm(serviceID, templateID, form)
      .then(() => {
        // Revert button status back to normal
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        
        // Clear form inputs dynamically
        form.reset();
        
        // Pull down saved user identity if present, otherwise default to form entry
        const visitorName = localStorage.getItem("viewerName") || name || "Friend";
        
        // Trigger your custom success popup
        showSuccessAlert(visitorName);
      })
      .catch((error) => {
        // Reset interactive layout even if it fails
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        
        // Handle delivery exceptions smoothly
        alert("Failed to send message. Please verify internet connectivity or try again later.");
        console.error("EmailJS Error Log:", error);
      });
  });
}

function showSuccessAlert(name) {
  // Create dynamic alert modal on-the-fly
  const alertOverlay = document.createElement("div");
  alertOverlay.className = "name-modal active";
  alertOverlay.style.zIndex = "3000";
  
  alertOverlay.innerHTML = `
    <div class="name-modal-content" style="border-color: var(--color-success);">
      <div class="name-modal-icon" style="background: rgba(16, 185, 129, 0.1); color: var(--color-success);">
        <i class="fas fa-check-circle"></i>
      </div>
      <h3>Message Sent Successfully!</h3>
      <p>Thank you <strong>${name}</strong>, your message has been transmitted. I'll review it and get back to you as soon as possible!</p>
      <button class="btn btn-primary alert-close-btn" style="width: 100%;">Awesome</button>
    </div>
  `;
  
  document.body.appendChild(alertOverlay);
  
  const closeAlert = () => {
    alertOverlay.classList.remove("active");
    setTimeout(() => alertOverlay.remove(), 300);
  };
  
  alertOverlay.querySelector(".alert-close-btn").addEventListener("click", closeAlert);
  alertOverlay.addEventListener("click", (e) => {
    if (e.target === alertOverlay) closeAlert();
  });
}