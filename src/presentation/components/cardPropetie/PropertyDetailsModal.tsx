import React from "react";
import "./PropertyDetailsModal.css";

interface PropertyDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  property: {
    title: string;
    location: string;
    price: string;
    image: string;
    features: { label: string; value: string | number }[];
    description?: string;
  } | null;
}

const PropertyDetailsModal: React.FC<PropertyDetailsModalProps> = ({ isOpen, onClose, property }) => {
  if (!isOpen || !property) return null;

  return (
    <div className="property-modal-overlay" onClick={onClose}>
      <div className="property-modal" onClick={e => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>×</button>
        <img src={property.image} alt={property.title} className="property-modal-img" />
        <h2 className="property-modal-title">{property.title}</h2>
        <p className="property-modal-location">{property.location}</p>
        <p className="property-modal-price">{property.price}</p>
        <div className="property-modal-features">
          {property.features.map((f, i) => (
            <span key={i} className="property-modal-feature">{f.label}: {f.value}</span>
          ))}
        </div>
        {property.description && <p className="property-modal-description">{property.description}</p>}
      </div>
    </div>
  );
};

export default PropertyDetailsModal;
