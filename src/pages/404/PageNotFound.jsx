import React from "react";

import { AlertTriangle } from "lucide-react";
import "./pageNotFound.css";
import { Link } from "react-router";

export default function PageNotFound() {
    
  return (
    <div className="pnf-wrapper">
      <div className="pnf-card">
        <AlertTriangle size={64} className="pnf-icon" />

        <h1 className="pnf-code">404</h1>

        <p className="pnf-text">
          The page you are looking for doesn’t exist or moved.
        </p>

        <Link to="/" className="pnf-btn">
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
}
