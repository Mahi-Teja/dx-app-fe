// src/components/common/Card.jsx
export const Card = ({ children }) => {
  return (
    <div className="bg-surface border border-border bg-primary-foreground rounded-xl p-4 shadow-sm">
      <h3 className="text-text-main font-bold">Card Title</h3>
      <p className="text-text-muted text-sm">This is using our theme tokens.</p>
      <button className="mt-4 bg-primary text-primary-foreground px-4 py-2 rounded-lg">
        Click Me
      </button>
    </div>
  );
};
