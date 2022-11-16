import icons from "./icons";

const { MdLibraryMusic, FaRegDotCircle, TbChartArcs, MdOutlineFeed } = icons;
export const sidebarMenu = [
  {
    path: "mymusic",
    text: "Cá nhân ",
    icons: <MdLibraryMusic size={24} />,
  },
  {
    path: "",
    text: "Khám phá ",
    end : true,
    icons: <FaRegDotCircle size={24} />,
  },
  {
    path: "zing-chart",
    text: "#zingchart ",
    icons: <TbChartArcs size={24} />,
  },
  {
    path: "follow",
    text: "Theo dõi ",
    icons: <MdOutlineFeed size={24} />,
  },
];
