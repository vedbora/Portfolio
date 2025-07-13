// src/components/Contact.tsx
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { Mail, Phone, MapPin, Send, Github, Linkedin } from 'lucide-react';
import emailjs from '@emailjs/browser';

const Contact: React.FC = () => {
  const { ref, isInView } = useInView({ threshold: 0.3 });
  const formRef = useRef<HTMLFormElement>(null);

  const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    subject: '',
    message: '',
  });

  const [sending, setSending] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (sending) return;
    setSending(true);

    emailjs
      .send(
        'service_77l4ofl',
        'template_7vjllkg',
        {
          user_name: formData.user_name,
          user_email: formData.user_email,
          subject: formData.subject || '(no subject)',
          message: formData.message,
        },
        'YtGvinRQpySYAl_1N'
      )
      .then(() => {
        alert('✅ Message sent successfully!');
        setFormData({ user_name: '', user_email: '', subject: '', message: '' });
      })
      .catch((err) => {
        console.error('❌ EmailJS error:', err); // View exact issue here
        alert(`❌ Failed to send: ${err?.text || 'Please try again later.'}`);
      })
      .finally(() => setSending(false));
  };

  // Optional Alternative — sendForm (use if needed)
  // emailjs.sendForm('service_ID', 'template_ID', formRef.current, 'public_key')

  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'vedantb9850@gmail.com', href: 'mailto:vedantb9850@gmail.com' },
    { icon: Phone, label: 'Phone', value: '+91 9823033829', href: 'tel:+919823033829' },
    { icon: MapPin, label: 'Location', value: 'Pune, Maharashtra, India', href: '#' },
  ];

  const socialLinks = [
    { icon: Github, label: 'GitHub', href: 'https://github.com/vedbora', color: 'hover:text-gray-400' },
    { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com/in/vedant-bora-b2a7582b1', color: 'hover:text-blue-400' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black" />
      <div className="absolute bottom-0 right-0 w-96 h-96 opacity-20">
        <motion.div
          className="w-full h-full rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 relative"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        >
          <div className="absolute inset-4 rounded-full bg-gradient-to-br from-primary-600 to-secondary-600 opacity-70" />
          <div className="absolute inset-8 rounded-full bg-gradient-to-br from-primary-700 to-secondary-700 opacity-50" />
          <motion.div
            className="absolute -inset-8 rounded-full bg-gradient-to-br from-primary-400/30 to-secondary-400/30 blur-xl"
            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute -inset-12 border-2 border-primary-400/20 rounded-full"
            animate={{ rotate: -360 }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute -inset-16 border border-secondary-400/20 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          />
        </motion.div>
      </div>

      <div className="container mx-auto px-6 relative z-10" ref={ref}>
        <motion.div variants={containerVariants} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Get In{' '}
              <span className="bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
                Touch
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto mb-8" />
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Ready to start your next project? Let's create something amazing together.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <motion.div variants={itemVariants} className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Let's Connect</h3>
                <p className="text-gray-300 leading-relaxed mb-8">
                  I'm currently seeking internship and entry-level opportunities in Java and full-stack
                  development. Whether you’ve got a project idea or just want to chat tech, drop me a line!
                </p>
              </div>
              <div className="space-y-4">
                {contactInfo.map((info, i) => (
                  <motion.a
                    key={info.label}
                    href={info.href}
                    className="flex items-center space-x-4 p-4 bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700/50 hover:border-primary-500/50 transition-all duration-300 group"
                    whileHover={{ scale: 1.02, x: 10 }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                  >
                    <div className="p-3 bg-primary-500/20 rounded-lg border border-primary-500/30 group-hover:bg-primary-500/30 transition-colors">
                      <info.icon className="w-6 h-6 text-primary-400" />
                    </div>
                    <div>
                      <div className="font-semibold text-white">{info.label}</div>
                      <div className="text-gray-300 group-hover:text-primary-400 transition-colors">{info.value}</div>
                    </div>
                  </motion.a>
                ))}
              </div>
              <div className="pt-8">
                <h4 className="text-lg font-semibold text-white mb-4">Follow Me</h4>
                <div className="flex space-x-4">
                  {socialLinks.map((s) => (
                    <motion.a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-4 bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700/50 hover:border-primary-500/50 transition-all duration-300 ${s.color}`}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <s.icon className="w-6 h-6" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div variants={itemVariants}>
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="user_name" className="block text-sm font-medium text-gray-300 mb-2">
                      Name
                    </label>
                    <input
                      id="user_name"
                      name="user_name"
                      type="text"
                      value={formData.user_name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-800/50 backdrop-blur-sm border border-gray-600 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none text-white placeholder-gray-400 transition-all duration-300"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="user_email" className="block text-sm font-medium text-gray-300 mb-2">
                      Email
                    </label>
                    <input
                      id="user_email"
                      name="user_email"
                      type="email"
                      value={formData.user_email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-800/50 backdrop-blur-sm border border-gray-600 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none text-white placeholder-gray-400 transition-all duration-300"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                    Subject
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800/50 backdrop-blur-sm border border-gray-600 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none text-white placeholder-gray-400 transition-all duration-300"
                    placeholder="What's this about?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800/50 backdrop-blur-sm border border-gray-600 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none text-white placeholder-gray-400 transition-all duration-300 resize-none"
                    placeholder="Tell me about your project or just say hello!"
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={sending}
                  className="w-full py-4 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-60"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Send className="w-5 h-5" />
                  <span>{sending ? 'Sending…' : 'Send Message'}</span>
                </motion.button>
              </form>
            </motion.div>
          </div>

          <motion.div variants={itemVariants} className="text-center mt-20 pt-8 border-t border-gray-700/50">
            <p className="text-gray-400">© 2025 Vedant Bora. Built with React, TypeScript, and Tailwind CSS.</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
