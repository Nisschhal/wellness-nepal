"use client"

import React from "react"
import { motion } from "framer-motion"
import {
  Shield,
  Zap,
  Globe,
  Heart,
  Target,
  Award,
  LucideIcon,
} from "lucide-react"
import SectionHeading from "./SectionHeading"
import { aboutData } from "@/assets/data/aboutData"

const IconMap: Record<string, LucideIcon> = {
  Shield,
  Zap,
  Globe,
  Heart,
  Target,
  Award,
}

// export default function About() {
//   const { manifesto, imageSection, pillars } = aboutData

//   return (
//     <div className="bg-surface min-h-screen pt-28 md:pt-40 pb-20 md:pb-24 transition-colors duration-300 relative">
//       {/* The background pattern layer */}
//       <div className="fixed inset-0 bg-pattern pointer-events-none z-0"></div>

//       <div className="container mx-auto px-6 relative z-10">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center mb-20 md:mb-40">
//           <motion.div
//             initial={{ opacity: 0, x: -50 }}
//             animate={{ opacity: 1, x: 0 }}
//           >
//             <SectionHeading
//               title={manifesto.title}
//               subtitle={manifesto.subtitle}
//             />
//             <h3 className="font-bebas text-2xl md:text-4xl text-surface-text italic mb-6 md:mb-10 uppercase tracking-wide leading-tightest">
//               {manifesto.heading.split(".")}
//             </h3>

//             <div className="space-y-6 md:space-y-8 text-surface-muted leading text-lg md:text-xl font-light italic">
//               {manifesto.description.map((text, i) => (
//                 <p key={i} dangerouslySetInnerHTML={{ __html: text }} />
//               ))}
//             </div>

//             <div className="mt-10 md:mt-16 flex flex-wrap gap-8 md:gap-10">
//               {manifesto.stats.map((stat, i) => {
//                 const Icon = IconMap[stat.icon]
//                 return (
//                   <div key={i} className="flex items-center gap-4">
//                     {Icon && <Icon className="text-brand-red" size={28} />}
//                     <span className="font-bebas text-xl md:text-2xl tracking-widest uppercase italic">
//                       {stat.label}
//                     </span>
//                   </div>
//                 )
//               })}
//             </div>
//           </motion.div>

//           {/* Image Section */}
//           <div className="relative aspect-square max-w-lg mx-auto lg:max-w-none w-full">
//             <div className="absolute inset-0 border-4 md:border-8 border-brand-red -translate-x-4 md:-translate-x-8 translate-y-4 md:translate-y-8 z-0 opacity-10"></div>
//             <img
//               src={imageSection.url}
//               className="w-full h-full object-cover relative z-10 [@media(hover:hover)]:grayscale border border-surface-border shadow-2xl transition-all duration-1000"
//               alt={imageSection.alt}
//             />
//             <div className="absolute -bottom-6 -right-6 md:-bottom-12 md:-right-12 bg-brand-red p-6 md:p-12 z-20 shadow-2xl -skew-x-12">
//               <p className="font-bebas text-5xl md:text-7xl text-white italic leading-none skew-x-12">
//                 {imageSection.badgeValue}
//               </p>
//               <p className="text-white font-bold text-[8px] md:text-xs tracking-widest mt-2 uppercase skew-x-12">
//                 {imageSection.badgeLabel}
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Pillars Section */}
//         <div className="py-16 md:py-32 border-y border-surface-border bg-surface-darker/50 backdrop-blur-sm px-6 md:px-10">
//           <SectionHeading title={pillars.title} subtitle={pillars.subtitle} />
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16 mt-12 md:mt-20">
//             {pillars.items.map((p, i) => {
//               const Icon = IconMap[p.icon]
//               return (
//                 <div key={i} className="space-y-4 md:space-y-6 group">
//                   <div className="w-16 h-16 md:w-20 md:h-20 bg-surface flex items-center justify-center text-brand-red -skew-x-12 border border-surface-border shadow-lg group-hover:bg-brand-red group-hover:text-white transition-all">
//                     <div className="skew-x-12">
//                       {Icon && <Icon size={32} />}
//                     </div>
//                   </div>
//                   <h4 className="font-bebas text-2xl md:text-3xl text-surface-text tracking-widest uppercase italic">
//                     {p.title}
//                   </h4>
//                   <p className="text-surface-muted text-base md:text-lg italic leading-relaxed font-medium">
//                     {p.desc}
//                   </p>
//                 </div>
//               )
//             })}
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

const About: React.FC = () => {
  return (
    <div className="bg-surface min-h-screen pt-28 md:pt-40 pb-20 md:pb-24 transition-colors duration-300 relative">
      <div className="fixed inset-0 bg-pattern pointer-events-none z-0"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center mb-20 md:mb-40">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <SectionHeading
              title="OUR MANIFESTO"
              subtitle="FORGED IN KATHMANDU"
            />
            <h3 className="font-bebas text-2xl md:text-4xl text-surface-text italic mb-6 md:mb-10 uppercase tracking-wide leading">
              WE DON'T JUST SELL GEAR. WE BUILD DESTINATIONS.
            </h3>
            <div className="space-y-6 md:space-y-8 text-surface-muted leading  text-lg md:text-xl font-normal italic">
              <p>
                Founded in 2015, Wellness Nepal was born from a single
                realization:{" "}
                <span className="text-surface-text font-bold uppercase">
                  Nepal deserved better.
                </span>{" "}
                For too long, gym owners were forced to settle for sub-par
                imports that crumbled under high-volume commercial use.
              </p>
              <p>
                We engineered a new path. By merging global metallurgical
                standards with local{" "}
                <span className="text-brand-red font-bold italic tracking-widest uppercase underline decoration-2">
                  SHAKTI
                </span>{" "}
                engineering.
              </p>
            </div>

            <div className="mt-10 md:mt-16 flex flex-wrap gap-8 md:gap-10">
              <div className="flex items-center gap-4">
                <Target className="text-brand-red" size={28} />
                <span className="font-bebas text-xl md:text-2xl tracking-widest uppercase">
                  500+ EMPIRES BUILT
                </span>
              </div>
              <div className="flex items-center gap-4">
                <Award className="text-brand-red" size={28} />
                <span className="font-bebas text-xl md:text-2xl tracking-widest uppercase">
                  SHAKTI CERTIFIED
                </span>
              </div>
            </div>
          </motion.div>

          <div className="relative aspect-square max-w-lg mx-auto lg:max-w-none w-full">
            <div className="absolute inset-0 border-4 md:border-8 border-brand-red -translate-x-4 md:-translate-x-8 translate-y-4 md:translate-y-8 z-0 opacity-10"></div>
            <img
              src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800&auto=format&fit=crop"
              className="w-full h-full object-cover relative z-10 [@media(hover:hover)]:grayscale border border-surface-border shadow-2xl transition-all duration-1000"
              alt="Industrial Engineering"
            />
            <div className="absolute -bottom-6 -right-6 md:-bottom-12 md:-right-12 bg-brand-red p-6 md:p-12 z-20 shadow-2xl -skew-x-12">
              <p className="font-bebas text-5xl md:text-7xl text-white italic leading-none skew-x-12">
                10YR
              </p>
              <p className="text-white font-bold text-[8px] md:text-xs tracking-widest mt-2 uppercase skew-x-12">
                Frame Warranty
              </p>
            </div>
          </div>
        </div>

        {/* Pillars Section */}
        <div className="py-16 md:py-32 border-y border-surface-border bg-surface-darker/50 backdrop-blur-sm px-6 md:px-10">
          <SectionHeading
            title="THE SHAKTI STANDARD"
            subtitle="CORE COMPETENCIES"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16 mt-12 md:mt-20">
            {[
              {
                icon: <Shield size={32} />,
                title: "UNBREAKABLE",
                desc: "12-gauge cold-rolled steel frames built to withstand aggressive training.",
              },
              {
                icon: <Zap size={32} />,
                title: "PRECISION",
                desc: "Biomechanical engineering ensures results faster and safer than ever.",
              },
              {
                icon: <Globe size={32} />,
                title: "LOGISTICS",
                desc: "Nationwide technical support network reaching every district of Nepal.",
              },
              {
                icon: <Heart size={32} />,
                title: "ADVISORY",
                desc: "B2B consultancy on membership sales and ROI strategy.",
              },
            ].map((p, i) => (
              <div key={i} className="space-y-4 md:space-y-6 group">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-surface flex items-center justify-center text-brand-red -skew-x-12 border border-surface-border shadow-lg group-hover:bg-brand-red group-hover:text-white transition-all">
                  <div className="skew-x-12">{p.icon}</div>
                </div>
                <h4 className="font-bebas text-2xl md:text-3xl text-surface-text tracking-widest uppercase italic">
                  {p.title}
                </h4>
                <p className="text-surface-muted text-base md:text-lg italic leading-relaxed font-medium">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
