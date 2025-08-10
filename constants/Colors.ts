const tintColorLight = '#8B4513'; // Saddle Brown - warm, earthy tone
const tintColorDark = '#D2691E'; // Chocolate - warm accent for dark mode

export default {
  light: {
    text: '#2C1810', // Dark brown for primary text
    textSecondary: '#6B4423', // Medium brown for secondary text
    textTertiary: '#8B7355', // Light brown for tertiary text
    background: '#FDFBF7', // Warm off-white background
    surface: '#FFFFFF', // Pure white for cards
    tint: tintColorLight,
    tabIconDefault: '#B8860B', // Dark goldenrod
    tabIconSelected: tintColorLight,
    primary: '#8B4513', // Saddle Brown
    secondary: '#D2691E', // Chocolate
    accent: '#F4A460', // Sandy Brown
    success: '#228B22', // Forest Green
    warning: '#FF8C00', // Dark Orange
    error: '#DC143C', // Crimson
    border: '#E6D7C3', // Light beige border
    shadow: 'rgba(139, 69, 19, 0.1)', // Brown shadow
  },
  dark: {
    text: '#F5F5DC', // Beige text
    textSecondary: '#DEB887', // Burlywood secondary text
    textTertiary: '#CD853F', // Peru tertiary text
    background: '#1A1A1A', // Dark background
    surface: '#2D2D2D', // Dark surface
    tint: tintColorDark,
    tabIconDefault: '#D2691E', // Chocolate
    tabIconSelected: tintColorDark,
    primary: '#D2691E', // Chocolate
    secondary: '#F4A460', // Sandy Brown
    accent: '#DEB887', // Burlywood
    success: '#32CD32', // Lime Green
    warning: '#FFA500', // Orange
    error: '#FF6347', // Tomato
    border: '#4A4A4A', // Dark border
    shadow: 'rgba(0, 0, 0, 0.3)', // Dark shadow
  },
};
