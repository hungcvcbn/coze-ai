"use client";

import { motion } from "framer-motion";
import React from "react";

export default function ServicePrice() {
  const pricingPlans = [
    {
      name: "Basic",
      price: "499k",
      description: "Ideal for small businesses and individuals",
      features: [
        "1 AI Bot",
        "1,000 messages/month",
        "Website integration",
        "Support email",
        "1GB document storage",
        "Response time: 24h",
        "Basic support via chat",
        "Basic conversation management",
        "Access management interface",
      ],

      buttonText: "Start free",
      popular: false,
    },
    {
      name: "Premium",
      price: "1.499k",
      description: "Effective solution for medium and small businesses",
      features: [
        "5 AI Bot",
        "10,000 messages/month",
          "Multi-platform integration",
        "Data analysis",
        "10GB document storage",
        "Priority support",
        "Custom API",
      ],
      buttonText: "Start free",
      popular: true,
    },
    {
      name: "Platinum",
      price: "Contact us",
      description: "For large businesses with high customization needs",
      features: [
        "Unlimited AI Bot",
        "Unlimited messages",
        "Unlimited document storage",
        "Advanced data analysis",
        "Unlimited support 24/7",
        "Training & setup",
        "SLA guaranteed",
      ],
      buttonText: "Contact us",
      popular: false,
    },
  ];
  return (
    <div className="py-20 bg-white" id="pricing">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-32-32 font-bold text-neutral mb-4">
            Service price
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose the service plan that best suits your business needs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={index}
              className={`rounded-xl shadow-lg overflow-hidden border ${
                plan.popular ? "border-primary" : "border-gray-200"
              } ${plan.popular ? "bg-primary-50" : "bg-white"} relative`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -10 }}
            >
              {plan.popular && (
                <>
                  <div className="absolute top-2 left-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-yellow-300"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 1L9 9H2L7 14.5L5 22L12 17.5L19 22L17 14.5L22 9H15L12 1Z" />
                    </svg>
                  </div>
                  <div className="bg-primary text-white text-center py-2 font-medium flex items-center justify-center gap-2">
                    Most popular
                  </div>
                  <div className="absolute top-2 right-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-yellow-300"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 1L9 9H2L7 14.5L5 22L12 17.5L19 22L17 14.5L22 9H15L12 1Z" />
                    </svg>
                  </div>
                </>
              )}
              <div className="p-4">
                <h3 className="text-20-28 text-primary font-bold mb-4">
                  {plan.name}
                </h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.price !== "Contact us" && (
                    <span className="text-gray-600">/month</span>
                  )}
                </div>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <svg
                        className="w-5 h-5 text-primary flex-shrink-0 mt-0.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className="py-3 bg-primary-400 text-white rounded-full px-6 ">
                  {plan.buttonText}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
