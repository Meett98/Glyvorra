import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { whatsappGeneral } from "../lib/utils";

export default function FloatingWhatsApp() {
  return (
    <motion.a
      href={whatsappGeneral()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.2, duration: 0.7 }}
      whileHover={{ scale: 1.06 }}
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lift"
    >
      <MessageCircle size={26} strokeWidth={1.6} />
    </motion.a>
  );
}
