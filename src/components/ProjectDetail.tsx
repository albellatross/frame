import React, { useEffect, useState, useRef } from 'react';
import { Project, CaseSection } from '../types';
import { ArrowRight, ExternalLink, ChevronUp, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { assetUrl } from '../utils/assets';

interface ProjectDetailProps {
  project: Project | null;
  onClose: () => void;
}

// ======= CaseSection Renderers =======
const CategoryLabel: React.FC<{ category?: string }> = ({ category }) =>
  category ? <span className="text-sm sm:text-base font-serif italic tracking-wide mb-6 block" style={{ color: '#7B61FF' }}>{category}</span> : null;

const SectionLabel: React.FC<{ label?: string }> = ({ label }) =>
  label ? <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest mb-3 block" style={{ color: '#7B61FF' }}>{label}</span> : null;

const SectionWrapper: React.FC<{ children: React.ReactNode; bg?: string; className?: string }> = ({ children, bg = '#F8F8FA', className = '' }) => (
  <div style={{ backgroundColor: bg }} className={className}>
    <div className="max-w-5xl mx-auto px-6 sm:px-8 md:px-12 py-14 sm:py-20">
      {children}
    </div>
  </div>
);

const CaseSectionRenderer: React.FC<{ section: CaseSection; isZh: boolean }> = ({ section, isZh }) => {
  switch (section.type) {
    case 'hero':
      return (
        <div className="relative w-full overflow-hidden" style={{ minHeight: '480px' }}>
          {section.bgImage && <img src={assetUrl(section.bgImage)} alt="" className="absolute inset-0 w-full h-full object-cover" />}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />
          <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 md:px-12 flex flex-col justify-end h-full pb-14 pt-40">
            <span className="text-sm font-serif italic tracking-wide text-white/60 mb-6">PROJECT OVERVIEW</span>
            {section.tags && (
              <div className="flex flex-wrap gap-2 mb-5">
                {section.tags.map((t, i) => <span key={i} className="text-xs px-4 py-1.5 rounded-full border border-white/30 text-white/90 backdrop-blur-sm">{t}</span>)}
              </div>
            )}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white mb-3 leading-tight">{section.title}</h1>
            {section.subtitle && <p className="text-lg sm:text-xl text-white/80 mb-5 italic">{section.subtitle}</p>}
            <div className="flex flex-wrap gap-6 text-sm text-white/60 mt-2">
              {section.date && <span>{isZh ? '项目时间：' : 'Duration: '}{section.date}</span>}
              {section.role && <span>{isZh ? '项目角色：' : 'Role: '}{section.role}</span>}
            </div>
          </div>
        </div>
      );

    case 'stats':
      return (
        <SectionWrapper bg="#ffffff">
          <CategoryLabel category={section.category} />
          <SectionLabel label={section.label} />
          <h3 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-2">{section.title}</h3>
          {section.subtitle && <p className="text-base text-neutral-500 mb-6">{section.subtitle}</p>}
          {section.content && <p className="text-neutral-600 leading-relaxed text-base sm:text-lg mb-10 max-w-3xl">{section.content}</p>}
          {section.stats && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {section.stats.map((s, i) => (
                <div key={i} className="rounded-2xl p-8 border" style={{ backgroundColor: '#F0EDFF', borderColor: '#E0DBFF' }}>
                  <span className="text-4xl sm:text-5xl font-serif block mb-2" style={{ color: '#7B61FF' }}>{s.value}</span>
                  <span className="text-sm text-neutral-500 leading-relaxed">{s.label}</span>
                </div>
              ))}
            </div>
          )}
        </SectionWrapper>
      );

    case 'personas':
      return (
        <SectionWrapper bg="#F8F8FA">
          <CategoryLabel category={section.category} />
          <SectionLabel label={section.label} />
          <h3 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-8">{section.title}</h3>
          {section.items && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {section.items.map((p, i) => (
                <div key={i} className="bg-white rounded-2xl p-7 shadow-sm overflow-hidden relative">
                  {p.color && <div className="absolute top-0 left-0 right-0 h-1" style={{ backgroundColor: p.color }} />}
                  <div className="flex items-center gap-4 mb-4 mt-1">
                    <span className="text-4xl">{p.icon}</span>
                    <div>
                      <span className="text-lg font-semibold text-neutral-900 block">{p.title}</span>
                      {p.subtitle && <span className="text-sm text-neutral-400">{p.subtitle}</span>}
                    </div>
                  </div>
                  <p className="text-sm text-neutral-600 leading-relaxed">{p.description}</p>
                </div>
              ))}
            </div>
          )}
        </SectionWrapper>
      );

    case 'flow':
      return (
        <SectionWrapper bg="#ffffff">
          <CategoryLabel category={section.category} />
          <SectionLabel label={section.label} />
          <h3 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-3">{section.title}</h3>
          {section.content && <p className="text-neutral-600 leading-relaxed mb-10 max-w-3xl">{section.content}</p>}
          {section.steps && (
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-6">
              {section.steps.map((s, i) => (
                <React.Fragment key={i}>
                  <div className="rounded-xl px-6 py-4 text-sm font-medium text-neutral-700 border" style={{ backgroundColor: '#F0EDFF', borderColor: '#E0DBFF' }}>{s.label}</div>
                  {i < section.steps!.length - 1 && <ArrowRight size={18} className="flex-shrink-0" style={{ color: '#7B61FF' }} />}
                </React.Fragment>
              ))}
            </div>
          )}
          {section.subtitle && <p className="text-center text-sm font-mono tracking-wider" style={{ color: '#7B61FF' }}>{section.subtitle}</p>}
          {section.image && (
            <div className="rounded-2xl overflow-hidden shadow-md mt-10">
              <img src={assetUrl(section.image)} alt="" className="w-full h-auto block" />
            </div>
          )}
        </SectionWrapper>
      );

    case 'cards':
      return (
        <SectionWrapper bg="#F8F8FA">
          <CategoryLabel category={section.category} />
          <SectionLabel label={section.label} />
          <h3 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-8">{section.title}</h3>
          {section.items && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {section.items.map((c, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 shadow-sm">
                  <div className="flex gap-4">
                    {c.icon && <span className="text-3xl flex-shrink-0">{c.icon}</span>}
                    <div>
                      <span className="text-base font-semibold text-neutral-900 block mb-2">{c.title}</span>
                      <span className="text-sm text-neutral-500 leading-relaxed block">{c.description}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </SectionWrapper>
      );

    case 'principles':
      return (
        <SectionWrapper bg="#ffffff">
          <CategoryLabel category={section.category} />
          <SectionLabel label={section.label} />
          <h3 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-8">{section.title}</h3>
          {section.items && (
            <div className="space-y-5">
              {section.items.map((p, i) => (
                <div key={i} className="rounded-2xl p-7 border" style={{ backgroundColor: '#FAFAFF', borderColor: '#EEEAFF' }}>
                  <div className="flex items-baseline gap-4 mb-3">
                    <span className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0" style={{ backgroundColor: '#7B61FF' }}>{p.number || i + 1}</span>
                    <div>
                      <span className="text-lg font-semibold text-neutral-900">{p.title}</span>
                      {p.subtitle && <span className="text-sm ml-3" style={{ color: '#7B61FF' }}>{p.subtitle}</span>}
                    </div>
                  </div>
                  <p className="text-sm text-neutral-600 leading-relaxed ml-12">{p.description}</p>
                </div>
              ))}
            </div>
          )}
        </SectionWrapper>
      );

    case 'two-column':
      return (
        <SectionWrapper bg="#F8F8FA">
          <CategoryLabel category={section.category} />
          <SectionLabel label={section.label} />
          <h3 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-3">{section.title}</h3>
          {section.subtitle && <p className="text-neutral-500 text-sm leading-relaxed mb-10 max-w-3xl">{section.subtitle}</p>}
          {section.columns && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {section.columns.map((col, i) => (
                <div key={i} className="bg-white rounded-2xl p-7 shadow-sm">
                  <h4 className="text-base font-semibold text-neutral-900 mb-5 pb-3 border-b border-neutral-100">{col.title}</h4>
                  <ul className="space-y-3">
                    {col.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-3 text-sm text-neutral-600">
                        <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: '#7B61FF' }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </SectionWrapper>
      );

    case 'voice-states':
      return (
        <SectionWrapper bg="#ffffff">
          <CategoryLabel category={section.category} />
          <SectionLabel label={section.label} />
          <h3 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-2">{section.title}</h3>
          {section.subtitle && <p className="text-sm font-mono mb-4" style={{ color: '#7B61FF' }}>{section.subtitle}</p>}
          {section.content && <p className="text-neutral-600 leading-relaxed mb-10 max-w-3xl">{section.content}</p>}
          {section.items && (
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-5">
              {section.items.map((s, i) => (
                <div key={i} className="text-center bg-white rounded-2xl p-5 shadow-sm">
                  <div className="w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: s.color + '15' }}>
                    <div className="w-6 h-6 rounded-full" style={{ backgroundColor: s.color }} />
                  </div>
                  <span className="text-sm font-semibold text-neutral-800 block">{s.title}</span>
                  <span className="text-xs text-neutral-400 block mt-2 leading-relaxed">{s.description}</span>
                </div>
              ))}
            </div>
          )}
        </SectionWrapper>
      );

    case 'editorial-board': {
      const layoutMode = section.layout || 'full-bleed';
      const maxW = section.maxWidth || (layoutMode === 'contained' ? '1200px' : '100%');
      const isImmersive = layoutMode === 'immersive';
      return (
        <div style={{ backgroundColor: isImmersive ? '#111' : '#F8F8FA' }} className={isImmersive ? 'py-0' : ''}>
          <div
            className={`mx-auto ${layoutMode === 'contained' ? 'px-4 sm:px-6 py-14 sm:py-20' : layoutMode === 'immersive' ? 'py-0' : 'px-0 py-10 sm:py-16'}`}
            style={{ maxWidth: maxW }}
          >
            {(section.category || section.title) && (
              <div className={`${layoutMode === 'full-bleed' ? 'px-4 sm:px-6 max-w-6xl mx-auto' : ''} mb-6`}>
                <CategoryLabel category={section.category} />
                {section.title && (
                  <h3 className={`text-xl sm:text-2xl font-bold mb-1 ${isImmersive ? 'text-white' : 'text-neutral-900'}`}>{section.title}</h3>
                )}
                {section.subtitle && (
                  <p className={`text-sm ${isImmersive ? 'text-neutral-400' : 'text-neutral-500'}`}>{section.subtitle}</p>
                )}
              </div>
            )}
            {section.image && (
              <div className={layoutMode === 'contained' ? 'rounded-2xl overflow-hidden shadow-xl' : ''}>
                <img
                  src={assetUrl(section.image)}
                  alt={section.title || 'Portfolio board'}
                  className="w-full h-auto block"
                  style={{ maxWidth: maxW }}
                />
              </div>
            )}
            {section.caption && (
              <div className={`${layoutMode === 'full-bleed' ? 'px-4 sm:px-6 max-w-6xl mx-auto' : ''} mt-4`}>
                <p className={`text-xs italic ${isImmersive ? 'text-neutral-500' : 'text-neutral-400'}`}>{section.caption}</p>
              </div>
            )}
          </div>
        </div>
      );
    }

    case 'mockup':
      return (
        <div style={{ backgroundColor: '#F8F8FA' }}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
            <CategoryLabel category={section.category} />
            {section.title && (
              <div className="text-center mb-10">
                <h3 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-2">{section.title}</h3>
                {section.subtitle && <p className="text-sm text-neutral-500 max-w-2xl mx-auto">{section.subtitle}</p>}
              </div>
            )}
            {section.image && (
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img src={assetUrl(section.image)} alt={section.title || ''} className="w-full h-auto block" />
              </div>
            )}
          </div>
        </div>
      );

    case 'annotated-mockup': {
      const leftAnnotations = (section.annotations || []).filter(a => a.side === 'left');
      const rightAnnotations = (section.annotations || []).filter(a => a.side === 'right');
      return (
        <div style={{ backgroundColor: '#F8F8FA' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
            <CategoryLabel category={section.category} />
            {section.title && (
              <div className="text-center mb-4">
                <h3 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-2">{section.title}</h3>
                {section.subtitle && <p className="text-sm text-neutral-500 max-w-2xl mx-auto">{section.subtitle}</p>}
              </div>
            )}
            {/* Annotated layout: labels — image — labels */}
            <div className="flex items-stretch gap-0 mt-8">
              {/* Left annotations column */}
              <div className="hidden lg:block w-48 flex-shrink-0 relative">
                {leftAnnotations.map((a, i) => (
                  <div key={i} className="absolute right-0 flex items-center" style={{ top: `${a.y}%`, transform: 'translateY(-50%)' }}>
                    <div className="text-right mr-3 max-w-[160px]">
                      <span className="text-[11px] font-semibold text-neutral-800 block leading-tight">{a.label}</span>
                      {a.detail && <span className="text-[10px] text-neutral-400 block leading-tight mt-0.5">{a.detail}</span>}
                    </div>
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: a.color || '#7B61FF' }} />
                  </div>
                ))}
              </div>

              {/* Central image with anchor dots and connector lines */}
              <div className="flex-1 relative">
                <div className="rounded-2xl overflow-hidden shadow-xl relative">
                  <img src={assetUrl(section.image)} alt={section.title || ''} className="w-full h-auto block" />
                </div>
                {/* SVG connector lines overlay */}
                <svg className="hidden lg:block absolute inset-0 w-full h-full pointer-events-none" style={{ overflow: 'visible' }}>
                  {leftAnnotations.map((a, i) => {
                    const cy = a.y;
                    const cx = a.x != null ? a.x : 0;
                    return (
                      <g key={`l${i}`}>
                        <circle cx={`${cx}%`} cy={`${cy}%`} r="3" fill={a.color || '#7B61FF'} opacity="0.6" />
                        <line x1={`${cx}%`} y1={`${cy}%`} x2="-12" y2={`${cy}%`} stroke={a.color || '#7B61FF'} strokeWidth="0.75" opacity="0.35" />
                      </g>
                    );
                  })}
                  {rightAnnotations.map((a, i) => {
                    const cy = a.y;
                    const cx = a.x != null ? a.x : 100;
                    return (
                      <g key={`r${i}`}>
                        <circle cx={`${cx}%`} cy={`${cy}%`} r="3" fill={a.color || '#7B61FF'} opacity="0.6" />
                        <line x1={`${cx}%`} y1={`${cy}%`} x2="100%" y2={`${cy}%`} stroke={a.color || '#7B61FF'} strokeWidth="0.75" opacity="0.35" style={{ transform: 'translateX(12px)' }} />
                      </g>
                    );
                  })}
                </svg>
              </div>

              {/* Right annotations column */}
              <div className="hidden lg:block w-48 flex-shrink-0 relative">
                {rightAnnotations.map((a, i) => (
                  <div key={i} className="absolute left-0 flex items-center" style={{ top: `${a.y}%`, transform: 'translateY(-50%)' }}>
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: a.color || '#7B61FF' }} />
                    <div className="ml-3 max-w-[160px]">
                      <span className="text-[11px] font-semibold text-neutral-800 block leading-tight">{a.label}</span>
                      {a.detail && <span className="text-[10px] text-neutral-400 block leading-tight mt-0.5">{a.detail}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile: show annotations as chips below image */}
            <div className="lg:hidden mt-6 flex flex-wrap gap-2 justify-center">
              {(section.annotations || []).map((a, i) => (
                <span key={i} className="text-[10px] px-3 py-1.5 rounded-full border font-medium" style={{ borderColor: (a.color || '#7B61FF') + '40', color: a.color || '#7B61FF', backgroundColor: (a.color || '#7B61FF') + '08' }}>
                  {a.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      );
    }

    case 'text':
      return (
        <SectionWrapper bg="#ffffff">
          <div className="flex items-start gap-6">
            <div className="flex-1">
              <CategoryLabel category={section.category} />
              <SectionLabel label={section.label} />
              <h3 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-4">{section.title}</h3>
              {section.content && <p className="text-neutral-600 leading-relaxed text-base sm:text-lg max-w-3xl">{section.content}</p>}
            </div>
            {(section.image || section.secondaryImage) && (
              <div className="flex-shrink-0 flex items-center gap-2">
                {section.image && <img src={assetUrl(section.image)} alt="" className="w-12 h-12 sm:w-16 sm:h-16 object-contain drop-shadow-md" />}
                {section.secondaryImage && <img src={assetUrl(section.secondaryImage)} alt="" className="w-10 h-10 sm:w-14 sm:h-14 object-contain drop-shadow-md" />}
              </div>
            )}
          </div>
        </SectionWrapper>
      );

    case 'interaction-path':
      return (
        <SectionWrapper bg="#F8F8FA">
          <CategoryLabel category={section.category} />
          <SectionLabel label={section.label} />
          <h3 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-3">{section.title}</h3>
          {section.subtitle && <p className="text-neutral-500 text-sm mb-10 max-w-3xl">{section.subtitle}</p>}
          {/* Top flow: Listen → Ask → Resume */}
          {section.steps && (
            <div className="flex items-center justify-center gap-3 mb-10">
              {section.steps.map((s, i) => (
                <React.Fragment key={i}>
                  <div className="rounded-full px-6 py-2.5 text-sm font-semibold text-white" style={{ backgroundColor: '#7B61FF' }}>{s.label}</div>
                  {i < section.steps!.length - 1 && <ArrowRight size={20} style={{ color: '#7B61FF' }} />}
                </React.Fragment>
              ))}
            </div>
          )}
          {/* Table */}
          {section.rows && (
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
              <div className="grid grid-cols-3 text-sm font-semibold text-neutral-900 border-b" style={{ backgroundColor: '#F0EDFF' }}>
                <div className="px-6 py-4">{isZh ? '用户行为' : 'User Action'}</div>
                <div className="px-6 py-4">{isZh ? '系统反馈' : 'System Feedback'}</div>
                <div className="px-6 py-4">{isZh ? '用户价值' : 'User Value'}</div>
              </div>
              {section.rows.map((r, i) => (
                <div key={i} className="grid grid-cols-3 text-sm border-b border-neutral-100 last:border-0">
                  <div className="px-6 py-4 text-neutral-700 font-medium">{r.action}</div>
                  <div className="px-6 py-4 text-neutral-500">{r.feedback}</div>
                  <div className="px-6 py-4 font-medium" style={{ color: '#7B61FF' }}>{r.value}</div>
                </div>
              ))}
            </div>
          )}
          {section.content && <p className="text-sm text-neutral-500 mt-8 max-w-3xl leading-relaxed">{section.content}</p>}
        </SectionWrapper>
      );

    case 'state-flow':
      return (
        <SectionWrapper bg="#ffffff">
          <CategoryLabel category={section.category} />
          <SectionLabel label={section.label} />
          <h3 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-3">{section.title}</h3>
          {section.content && <p className="text-neutral-600 leading-relaxed mb-10 max-w-3xl">{section.content}</p>}
          {section.items && (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {section.items.map((s, i) => (
                <div key={i} className="relative">
                  {/* Card */}
                  <div className="bg-white rounded-2xl p-4 shadow-sm border border-neutral-100 text-center">
                    {/* Mini waveform visualization */}
                    <div className="flex items-center justify-center gap-1 h-16 mb-3">
                      {[0.4, 0.7, 1, 0.8, 0.5].map((h, bi) => (
                        <div key={bi} className="w-2 rounded-full transition-all" style={{ height: `${h * 32}px`, backgroundColor: s.color, opacity: 0.8 }} />
                      ))}
                    </div>
                    <span className="text-xs font-semibold text-neutral-800 block">{s.title}</span>
                    <span className="text-[10px] text-neutral-400 block mt-1">{s.description}</span>
                  </div>
                  {/* Arrow between cards */}
                  {i < section.items!.length - 1 && (
                    <div className="hidden sm:block absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                      <ArrowRight size={14} style={{ color: '#7B61FF' }} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </SectionWrapper>
      );

    case 'validation':
      return (
        <SectionWrapper bg="#F8F8FA">
          <CategoryLabel category={section.category} />
          <SectionLabel label={section.label} />
          <h3 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-3">{section.title}</h3>
          {section.subtitle && <p className="text-neutral-500 text-sm mb-10 max-w-3xl">{section.subtitle}</p>}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Metrics */}
            {section.stats && (
              <div className="space-y-5">
                {section.stats.map((s, i) => (
                  <div key={i} className="bg-white rounded-2xl p-7 shadow-sm text-center">
                    <span className="text-5xl sm:text-6xl font-serif block mb-2" style={{ color: '#7B61FF' }}>{s.value}</span>
                    <span className="text-sm text-neutral-500">{s.label}</span>
                    {s.description && <p className="text-xs text-neutral-400 mt-2">{s.description}</p>}
                  </div>
                ))}
              </div>
            )}
            {/* User Quotes */}
            {section.quotes && (
              <div className="space-y-4">
                {section.quotes.map((q, i) => (
                  <div key={i} className="bg-white rounded-2xl p-5 shadow-sm flex gap-3">
                    <span className="text-2xl flex-shrink-0">{q.avatar}</span>
                    <p className="text-sm text-neutral-600 leading-relaxed italic">"{q.text}"</p>
                  </div>
                ))}
              </div>
            )}
          </div>
          {section.content && <p className="text-sm text-neutral-500 mt-8 max-w-3xl leading-relaxed">{section.content}</p>}
        </SectionWrapper>
      );

    case 'design-rationale':
      return (
        <SectionWrapper bg="#ffffff">
          <CategoryLabel category={section.category} />
          <SectionLabel label={section.label} />
          <h3 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-3">{section.title}</h3>
          {section.content && <p className="text-neutral-600 leading-relaxed mb-6 max-w-3xl">{section.content}</p>}
          {/* Left: flow steps, Right: image */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
            {section.steps && (
              <div className="space-y-3">
                {section.subtitle && <p className="text-sm font-semibold mb-4" style={{ color: '#7B61FF' }}>{isZh ? '🎯 设计价值' : '🎯 Design Value'}</p>}
                {section.steps.map((s, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs text-white flex-shrink-0" style={{ backgroundColor: '#7B61FF' }}>{i + 1}</div>
                    <div className="flex-1 rounded-xl px-5 py-3 text-sm text-neutral-700 border" style={{ backgroundColor: '#FAFAFF', borderColor: '#EEEAFF' }}>{s.label}</div>
                  </div>
                ))}
              </div>
            )}
            {section.image && (
              <div className="rounded-2xl overflow-hidden shadow-md">
                <img src={assetUrl(section.image)} alt="" className="w-full h-auto block" />
              </div>
            )}
          </div>
          {section.items && section.items.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              {section.items.map((item, i) => (
                <div key={i} className="bg-white rounded-xl p-5 border border-neutral-100">
                  <span className="text-sm font-semibold text-neutral-800 block mb-1">{item.title}</span>
                  <span className="text-sm text-neutral-500 leading-relaxed">{item.description}</span>
                </div>
              ))}
            </div>
          )}
        </SectionWrapper>
      );

    case 'outcomes':
      return (
        <SectionWrapper bg="#F8F8FA">
          <CategoryLabel category={section.category} />
          <SectionLabel label={section.label} />
          <h3 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-3">{section.title}</h3>
          {section.subtitle && <p className="text-neutral-500 text-sm mb-6">{section.subtitle}</p>}
          {section.content && (
            <div className="text-white p-7 sm:p-8 rounded-2xl mb-8" style={{ backgroundColor: '#7B61FF' }}>
              <span className="text-2xl sm:text-3xl font-serif">{section.content}</span>
            </div>
          )}
          {section.items && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {section.items.map((o, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 shadow-sm">
                  <span className="text-base font-semibold text-neutral-900 block mb-2">{o.title}</span>
                  <span className="text-sm text-neutral-500 leading-relaxed block">{o.description}</span>
                </div>
              ))}
            </div>
          )}
          {section.image && (
            <div className="rounded-2xl overflow-hidden shadow-md mt-8">
              <img src={assetUrl(section.image)} alt="" className="w-full h-auto block" />
            </div>
          )}
        </SectionWrapper>
      );

    default:
      return null;
  }
};

const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, onClose }) => {
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();
  const isZh = language === 'zh';

  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
      setShowStickyBar(false);
      setShowBackToTop(false);
      if (scrollRef.current) scrollRef.current.scrollTop = 0;
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [project]);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    const handleScroll = () => {
      setShowStickyBar(container.scrollTop > 300);
      setShowBackToTop(container.scrollTop > 800);
    };
    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [project]);

  if (!project) return null;

  const scrollToTop = () => {
    scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Dark backdrop - can see content underneath */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-[55] bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Bottom sheet panel */}
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        className="fixed inset-x-0 bottom-0 z-[60] flex flex-col"
        style={{ top: '120px' }}
      >
        {/* Rounded top container */}
        <div className="relative flex flex-col h-full bg-white rounded-t-2xl overflow-hidden shadow-2xl">

          {/* Drag handle / top bar */}
          <div className="flex-shrink-0 sticky top-0 z-10 bg-white rounded-t-2xl">
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-10 h-1 rounded-full bg-neutral-300" />
            </div>
            <div className="px-4 sm:px-6 md:px-8 pb-2 flex items-center justify-end">
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center transition-colors"
              >
                <X size={16} className="text-neutral-500" />
              </button>
            </div>
          </div>

          {/* Sticky bar that appears on scroll */}
          <AnimatePresence>
            {showStickyBar && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute top-0 left-0 right-0 z-20 bg-white/95 backdrop-blur-md rounded-t-2xl shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
              >
                <div className="flex justify-center pt-3 pb-2">
                  <div className="w-10 h-1 rounded-full bg-neutral-300" />
                </div>
                <div className="px-4 sm:px-6 md:px-8 pb-2 flex items-center justify-between">
                  <span className="text-sm font-medium text-neutral-900 truncate max-w-[250px] sm:max-w-[400px]">{project.title}</span>
                  <button
                    onClick={onClose}
                    className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center transition-colors"
                  >
                    <X size={16} className="text-neutral-500" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Scrollable content */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto scroll-smooth bg-cream">

            {/* Mode A: Slide Showcase — for finished portfolio pages */}
            {project.slides && project.slides.length > 0 ? (
              <div className="bg-neutral-50">
                {/* Light header */}
                <div className="max-w-5xl mx-auto px-6 sm:px-8 md:px-12 py-10 sm:py-14">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags && project.tags.map((t, i) => (
                      <span key={i} className="text-[10px] px-3 py-1 rounded-full border border-neutral-200 text-neutral-500 uppercase tracking-wider">{t}</span>
                    ))}
                  </div>
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-neutral-900 mb-3 leading-tight">{project.title}</h1>
                  <p className="text-base sm:text-lg text-neutral-500 italic max-w-2xl">{project.shortDescription}</p>
                  <div className="flex flex-wrap gap-6 text-xs text-neutral-400 mt-5 pt-5 border-t border-neutral-100">
                    <span>{project.role}</span>
                    <span>{project.year}</span>
                    <span>{project.platform}</span>
                    <span className="ml-auto text-neutral-300">{project.slides.length} {isZh ? '页' : 'pages'}</span>
                  </div>
                </div>

                {/* Slides — vertical scroll showcase */}
                <div className="space-y-1 pb-16">
                  {project.slides.map((src, i) => (
                    <div key={i} className="relative group">
                      <img
                        src={assetUrl(src)}
                        alt={`${project.title} — ${isZh ? '第' : 'Page '}${i + 1}${isZh ? '页' : ''}`}
                        className="w-full h-auto block"
                        loading={i < 2 ? 'eager' : 'lazy'}
                      />
                      {/* Page indicator on hover */}
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-[10px] px-2.5 py-1 rounded-full bg-black/50 text-white/80 backdrop-blur-sm font-mono">
                          {i + 1} / {project.slides!.length}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            ) : project.caseSections && project.caseSections.length > 0 ? (
              /* Mode B: Modular Case Study — for projects built from sections */
              <>
                {project.caseSections.map((section, sIdx) => (
                  <CaseSectionRenderer key={sIdx} section={section} isZh={isZh} />
                ))}
              </>
            ) : (
              <>
                {/* Legacy: Hero Cover Image */}
                <div className="relative w-full bg-neutral-100 overflow-hidden" style={{ maxHeight: '480px' }}>
                  <img src={assetUrl(project.coverImage)} alt={project.title} className="w-full h-auto object-cover" style={{ maxHeight: '480px', objectPosition: 'center' }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </div>

                {/* Legacy: Project Info */}
                <div className="bg-white">
                  <div className="max-w-4xl mx-auto px-6 sm:px-8 md:px-12 py-8 sm:py-10">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif text-neutral-900 mb-2">{project.title}</h1>
                    <p className="text-neutral-500 text-sm sm:text-base leading-relaxed max-w-xl italic">{project.shortDescription}</p>
                    {project.tags && project.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-5 pt-5 border-t border-neutral-100">
                        {project.tags.map((tag, idx) => (
                          <span key={idx} className="text-xs px-3 py-1.5 rounded-full bg-neutral-100 text-neutral-600">{tag}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Legacy: Acts */}
                <div className="max-w-4xl mx-auto px-6 sm:px-8 md:px-12 py-12">
                  <div className="bg-white rounded-xl p-6 sm:p-8 shadow-sm mb-8">
                    <h3 className="text-xl font-serif text-neutral-900 mb-4">{project.acts.act1.title}</h3>
                    <p className="text-neutral-600 leading-relaxed">{project.acts.act1.content}</p>
                  </div>
                  <div className="bg-white rounded-xl p-6 sm:p-8 shadow-sm mb-8">
                    <h3 className="text-xl font-serif text-neutral-900 mb-4">{project.acts.act2.title}</h3>
                    <p className="text-neutral-600 leading-relaxed">{project.acts.act2.content}</p>
                  </div>
                  <div className="bg-white rounded-xl p-6 sm:p-8 shadow-sm">
                    <h3 className="text-xl font-serif text-neutral-900 mb-4">{project.acts.act3.title}</h3>
                    <p className="text-neutral-600 leading-relaxed">{project.acts.act3.content}</p>
                  </div>
                </div>
              </>
            )}

            {/* External Links */}
            {project.externalLinks && Object.keys(project.externalLinks).length > 0 && (
              <div className="bg-white border-t border-neutral-100">
                <div className="max-w-4xl mx-auto px-6 sm:px-8 md:px-12 py-10">
                  <p className="text-xs font-mono text-neutral-400 uppercase tracking-widest mb-4">{isZh ? '查看更多' : 'View More'}</p>
                  <div className="flex flex-wrap gap-3">
                    {project.externalLinks.behance && (
                      <a href={project.externalLinks.behance} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-[#2E4D4D] hover:bg-[#434D46] text-white px-5 py-2.5 rounded-full text-sm font-medium transition-colors">
                        <ExternalLink size={15} /> Behance
                      </a>
                    )}
                    {project.externalLinks.zcool && (
                      <a href={project.externalLinks.zcool} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-dark-brown hover:bg-brown text-white px-5 py-2.5 rounded-full text-sm font-medium transition-colors">
                        <ExternalLink size={15} /> Zcool
                      </a>
                    )}
                    {project.externalLinks.live && (
                      <a href={project.externalLinks.live} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 border border-neutral-300 hover:border-neutral-400 text-neutral-700 px-5 py-2.5 rounded-full text-sm font-medium transition-colors">
                        <ExternalLink size={15} /> {isZh ? '在线项目' : 'Live Project'}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Footer */}
            <div className="bg-white border-t border-neutral-100">
              <div className="max-w-4xl mx-auto px-6 sm:px-8 md:px-12 py-10 flex flex-col sm:flex-row justify-between items-center gap-4">
                <span className="text-sm text-neutral-400">{isZh ? '案例结束' : 'End of Case Study'}</span>
                <button
                  onClick={onClose}
                  className="flex items-center gap-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors group"
                >
                  {isZh ? '返回作品集' : 'Back to Portfolio'}
                  <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Back to top */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-[70] w-10 h-10 bg-dark-brown text-white rounded-full flex items-center justify-center shadow-lg hover:bg-brown transition-colors"
          >
            <ChevronUp size={18} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProjectDetail;
