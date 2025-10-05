// path: frontend/app/components/Loader.jsx
export default function Loader({ size = 40, color = "#6B46C1" }) {
  return (
    <div
      style={{ width: size, height: size }}
      className="border-4 border-gray-300 border-t-purple-600 rounded-full animate-spin"
    />
  );
}
