"use client";

import { motion } from "framer-motion";

export default function ChatDemoSection() {
  const chatFeatures = [
    {
      title: "Understand natural language",
      description:
        "Chatbot has the ability to understand and process the natural language of users, providing a more natural communication experience.",
    },
    {
      title: "Continuous learning",
      description:
        "Chatbot continuously learns from previous interactions to improve response and suggestion capabilities.",
    },
    {
      title: "Custom brand",
      description:
        "Customize the chatbot interface according to the brand style of the business.",
    },
    {
      title: "Support multiple languages",
      description:
        "Chatbot supports multiple languages, helping businesses reach global customers.",
    },
  ];
  return (
    <div
      className="py-16 bg-gradient-to-l from-primary-50 to-white px-4"
      id="chat-demo"
    >
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -200 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-32-32 font-bold text-neutral mb-6">
              Smart Chatbot AI Experience
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Zenee AI provides a powerful chatbot solution with the ability to
              understand natural language, integrate multiple platforms, and
              customize according to business needs.
            </p>
            <ul className="space-y-4">
              {chatFeatures.map((feature, index) => (
                <motion.li
                  key={index}
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="mt-1 text-primary">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM8 15L3 10L4.41 8.59L8 12.17L15.59 4.58L17 6L8 15Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium">{feature.title}</h4>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            className="rounded-xl shadow-2xl overflow-hidden border border-gray-200"
            initial={{ opacity: 0, x: 200 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-primary p-4 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-white opacity-50"></div>
              <div className="w-2 h-2 rounded-full bg-white opacity-70"></div>
              <div className="w-2 h-2 rounded-full bg-white"></div>
              <div className="ml-2 text-white font-medium">Zenee AI Chat</div>
            </div>
            <div className="h-96 bg-gray-50 p-3 overflow-y-auto">
              <div className="flex gap-3 mb-4">
                <div className="min-w-8 min-h-8 max-w-8 max-h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                  Z
                </div>
                <div className="bg-white p-3 rounded-lg shadow max-w-xs">
                  <p className="text-gray-800">
                    Hello! I am Zenee AI, how can I help you today?
                  </p>
                </div>
              </div>
              <div className="flex gap-3 justify-end mb-3">
                <div className="min-w-8 min-h-8 max-w-8 max-h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                  U
                </div>
                <div className="bg-primary-50 p-3 rounded-lg shadow max-w-xs">
                  <p className="text-gray-800">
                    I want to know more about the features of Zenee AI
                  </p>
                </div>
                <div className="min-w-8 min-h-8 max-w-8 max-h-8 rounded-full bg-gray-300 flex items-center justify-center text-white font-bold">
                  U
                </div>
              </div>
              <div className="flex gap-3 mb-4">
                <div className="min-w-8 min-h-8 max-w-8 max-h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                  Z
                </div>
                <div className="bg-white p-3 rounded-lg shadow max-w-sm">
                  <p className="text-gray-800">
                    Zenee AI provides many features like creating intelligent
                    chatbots, integrating multiple platforms, and customizing
                    according to needs. Which feature are you interested in
                    specifically?
                  </p>
                </div>
              </div>
            </div>
            <div className="p-4 border-t flex items-center gap-2">
              <input
                type="text"
                placeholder="Enter your question..."
                readOnly
                className="flex-1 rounded-full focus-none px-4 py-2 border border-gray-300 focus:outline-none focus:border-primary"
              />
              <button className="p-2 rounded-full bg-primary text-white">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.01 21L23 12L2.01 3L2 10L17 12L2 14L2.01 21Z"
                    fill="currentColor"
                  />
                </svg>
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
