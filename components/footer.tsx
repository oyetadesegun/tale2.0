"use client";

import { Heart, Gift, MessageCircle, Package, Instagram, Twitter, Mail, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card px-4 py-12">
      <div className="mx-auto max-w-5xl">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="mb-3 flex items-center gap-2">
              <Heart className="h-6 w-6 fill-primary text-primary" />
              <span className="font-serif text-xl font-bold text-foreground">TALE 2.0</span>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Helping you discover your partner{"'s"} love style and give gifts that truly matter.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="mb-3 text-sm font-bold uppercase tracking-wider text-foreground">
              Services
            </h4>
            <ul className="flex flex-col gap-2">
              <li>
                <a
                  href="#"
                  className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  <Gift className="h-4 w-4" />
                  DIY Gift Guide
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  <MessageCircle className="h-4 w-4" />
                  Done-With-You
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  <Package className="h-4 w-4" />
                  Done-For-You
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-3 text-sm font-bold uppercase tracking-wider text-foreground">
              Contact
            </h4>
            <ul className="flex flex-col gap-2">
              <li>
                <a
                  href="mailto:hello@tale.love"
                  className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  <Mail className="h-4 w-4" />
                  hello@tale.love
                </a>
              </li>
              <li>
                <a
                  href="tel:+2348000000000"
                  className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  <Phone className="h-4 w-4" />
                  +234 800 000 0000
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="mb-3 text-sm font-bold uppercase tracking-wider text-foreground">
              Follow Us
            </h4>
            <div className="flex gap-3">
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-secondary-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-secondary-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 flex flex-col items-center gap-2 border-t border-border pt-6 text-center">
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            Made with <Heart className="h-4 w-4 fill-primary text-primary" /> by TALE
          </div>
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} TALE 2.0. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
