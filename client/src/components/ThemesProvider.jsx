import { useSelector } from "react-redux";

export const ThemesProvider = ({children}) => {
    const {theme} = useSelector(state => state.theme);

  return (
    <div className={theme}>
        <div className="bgwhite text-gray-700 dark:text-gray-200 dark:bg-[rgb(16,23,42)] min-h-screen">
            {children}
        </div>
    </div>
  )
}

