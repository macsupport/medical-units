module.exports = {
    theme: {
        extend: {
            screens: {
        'print': {'raw': 'print'},
        // => @media  print { ... }
      }
        },
        screens: {
            'sm': '576px',
            // => @media (min-width: 640px) { ... }

            'md': '768px',
            // => @media (min-width: 768px) { ... }

            'lg': '1024px',
            // => @media (min-width: 1024px) { ... }

            'xl': '1280px',
            // => @media (min-width: 1280px) { ... }
        }
    },
    variants: {
        backgroundColor: ['responsive', 'hover', 'focus', 'active'],
        textColor: ['responsive', 'hover', 'focus', 'active', 'group-hover']
    },
    plugins: []
}