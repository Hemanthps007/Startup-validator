import React from 'react';
import type { BusinessModelCanvas as BMCType } from '../utils/simulator';
import { 
  Users, 
  CheckSquare, 
  Cpu, 
  Gift, 
  Heart, 
  Truck, 
  UserCheck, 
  DollarSign, 
  CreditCard 
} from 'lucide-react';

interface BMCProps {
  bmc: BMCType;
}

export const BusinessModelCanvas: React.FC<BMCProps> = ({ bmc }) => {
  // Ensure all 9 blocks are represented (Key Resources is standard)
  const keyResources = (bmc as any).keyResources || [
    "Proprietary software algorithms and hosting server arrays.",
    "Specialized engineering and product development staff.",
    "Integrated communication API connections and support protocols."
  ];

  const renderBlock = (
    title: string, 
    items: string[], 
    icon: React.ReactNode, 
    gridClass: string,
    desc: string
  ) => (
    <div className={`bmc-card ${gridClass}`} title={desc}>
      <div className="bmc-card-header">
        {icon}
        <h4 className="bmc-card-title">{title}</h4>
      </div>
      <ul className="bmc-list">
        {items.map((item, idx) => (
          <li key={idx} className="bmc-item">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="dashboard-pane animate-fade-in">
      <div>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Business Model Canvas</h2>
        <p style={{ color: 'var(--text-secondary)' }}>
          Review the core operational, audience, and financial pillars of your startup idea.
        </p>
      </div>

      <div className="bmc-grid">
        {renderBlock(
          "Key Partners", 
          bmc.keyPartners, 
          <Users size={16} />, 
          "bmc-partners",
          "External alliances, suppliers, and connectors helping the business scale."
        )}
        
        {renderBlock(
          "Key Activities", 
          bmc.keyActivities, 
          <CheckSquare size={16} />, 
          "bmc-activities",
          "Core actions the startup must execute to deliver its value proposition."
        )}

        {renderBlock(
          "Key Resources", 
          keyResources, 
          <Cpu size={16} />, 
          "bmc-resources",
          "The human, intellectual, financial, and physical assets required."
        )}

        {renderBlock(
          "Value Proposition", 
          bmc.valueProposition, 
          <Gift size={16} />, 
          "bmc-proposition",
          "The unique bundle of products and services creating value for segments."
        )}

        {renderBlock(
          "Customer Relationships", 
          bmc.customerRelationships, 
          <Heart size={16} />, 
          "bmc-relations",
          "Type of interactions established with segments to foster retention."
        )}

        {renderBlock(
          "Channels", 
          bmc.channels, 
          <Truck size={16} />, 
          "bmc-channels",
          "Touchpoints used to communicate with and deliver services to users."
        )}

        {renderBlock(
          "Customer Segments", 
          bmc.customerSegments, 
          <UserCheck size={16} />, 
          "bmc-segments",
          "The primary target groups of people or organizations you aim to serve."
        )}

        {renderBlock(
          "Cost Structure", 
          bmc.costStructure, 
          <DollarSign size={16} />, 
          "bmc-costs",
          "Major expenses incurred to build, launch, and operate the model."
        )}

        {renderBlock(
          "Revenue Streams", 
          bmc.revenueStreams, 
          <CreditCard size={16} />, 
          "bmc-revenues",
          "Monetization routes, pricing rules, and transactions that generate cash."
        )}
      </div>
    </div>
  );
};
