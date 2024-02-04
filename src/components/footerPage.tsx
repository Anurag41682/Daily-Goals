import { useTheme } from "@/components/theme-provider";
const FooterPage = () => {
  const { theme } = useTheme();
  return (
    <div
      style={theme === "dark" ? { color: "#181f38" } : { color: "#cccccc" }}
      className="footer h-1/6 flex justify-center items-end pb-2"
    >
      Made with &lt;3 by Anur4g
    </div>
  );
};
export default FooterPage;
