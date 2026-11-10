// Complete Menu Data with curated high-definition food photography for every item
export const MENU_DATA = {
  pizzas: {
    id: "pizzas",
    name: "Artisan Pizzas",
    badge: "Fresh Hand-Tossed",
    description: "Authentic dough crafted daily, signature marinara, 100% mozzarella, and premium toppings baked to crispy perfection.",
    items: [
      {
        id: "pizza-crispy-chicken",
        name: "Crispy Chicken & Cheese",
        category: "Regular Pizza",
        desc: "Golden crispy fried chicken chunks layered over rich tomato sauce and an ocean of melted mozzarella cheese.",
        tag: "Customer Favorite",
        prices: { Small: 700, Medium: 1350, Large: 1750, XL: 2490 },
        availableSizes: ["Small", "Medium", "Large", "XL"],
        extraToppingRates: { Small: 150, Medium: 200, Large: 300, XL: 400 },
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1000&q=80"
      },
      {
        id: "pizza-spicy-buffalo",
        name: "Spicy Buffalo Chicken",
        category: "Regular Pizza",
        desc: "Tangy & fiery buffalo chicken tenders, sliced jalapenos, spicy marinara, and double mozzarella cheese.",
        tag: "Fiery Hot",
        prices: { Small: 700, Medium: 1350, Large: 1750, XL: 2490 },
        availableSizes: ["Small", "Medium", "Large", "XL"],
        extraToppingRates: { Small: 150, Medium: 200, Large: 300, XL: 400 },
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1000&q=80"
      },
      {
        id: "pizza-sicilian-fajita",
        name: "Sicilian Fajita",
        category: "Regular Pizza",
        desc: "Marinated Mexican fajita chicken, crunchy bell peppers, sweet caramelized onions, black olives, and herbs.",
        tag: "Chef Recommendation",
        prices: { Small: 700, Medium: 1350, Large: 1750, XL: 2490 },
        availableSizes: ["Small", "Medium", "Large", "XL"],
        extraToppingRates: { Small: 150, Medium: 200, Large: 300, XL: 400 },
        image: "https://images.unsplash.com/photo-1590947132387-155cc02f3212?auto=format&fit=crop&w=1000&q=80"
      },
      {
        id: "pizza-garlic-parmesan",
        name: "Garlic Parmesan",
        category: "Regular Pizza",
        desc: "Rich creamy garlic parmesan white sauce, diced roasted chicken breast, oregano, and aged parmesan sprinkle.",
        tag: "Rich & Creamy",
        prices: { Small: 700, Medium: 1350, Large: 1750, XL: 2490 },
        availableSizes: ["Small", "Medium", "Large", "XL"],
        extraToppingRates: { Small: 150, Medium: 200, Large: 300, XL: 400 },
        image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=1000&q=80"
      },
      {
        id: "pizza-pepperoni",
        name: "Pepperoni Classic",
        category: "Regular Pizza",
        desc: "Generous discs of seasoned pepperoni baked until cup-crisp over bubbly melted mozzarella and Italian marinara.",
        tag: "All-Time Classic",
        prices: { Small: 700, Medium: 1350, Large: 1750, XL: 2490 },
        availableSizes: ["Small", "Medium", "Large", "XL"],
        extraToppingRates: { Small: 150, Medium: 200, Large: 300, XL: 400 },
        image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=1000&q=80"
      },
      {
        id: "pizza-seekh-kabab",
        name: "Seekh Kabab Pizza",
        category: "Regular Pizza",
        desc: "Traditional spiced charcoal seekh kabab chunks, sweet red onion rings, fresh green chilies, and aromatic herbs.",
        tag: "Desi Fusion",
        prices: { Small: 700, Medium: 1350, Large: 1750, XL: 2490 },
        availableSizes: ["Small", "Medium", "Large", "XL"],
        extraToppingRates: { Small: 150, Medium: 200, Large: 300, XL: 400 },
        image: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=1000&q=80"
      },
      {
        id: "pizza-smoky-bbq",
        name: "Smoky Bar B.Q",
        category: "Regular Pizza",
        desc: "Smoked barbecue chicken breast cubes, signature smokey hickory BBQ glaze drizzle, capsicum, and golden onions.",
        tag: "Smoky Goodness",
        prices: { Small: 700, Medium: 1350, Large: 1750, XL: 2490 },
        availableSizes: ["Small", "Medium", "Large", "XL"],
        extraToppingRates: { Small: 150, Medium: 200, Large: 300, XL: 400 },
        image: "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?auto=format&fit=crop&w=1000&q=80"
      },
      {
        id: "pizza-malai-botti",
        name: "Malai Botti (Special)",
        category: "Special Pizza - Slice of the Heaven",
        desc: "Melt-in-mouth creamy malai chicken tikka botti, rich white cheese sauce, green capsicum, and royal spices.",
        tag: "Special Reserve",
        prices: { Small: 750, Medium: 1350, Large: 1950, XL: 2700 },
        availableSizes: ["Small", "Medium", "Large", "XL"],
        extraToppingRates: { Small: 150, Medium: 200, Large: 300, XL: 400 },
        image: "https://images.unsplash.com/photo-1573821663912-569905455b1c?auto=format&fit=crop&w=1000&q=80"
      },
      {
        id: "pizza-chicken-extreme",
        name: "Chicken Extreme",
        category: "Special Pizza - Slice of the Heaven",
        desc: "Triple chicken sensation: grilled breast, crispy bits, spicy chunks loaded with mushrooms, jalapenos, and extra cheese.",
        tag: "Extreme Loaded",
        prices: { Small: 750, Medium: 1350, Large: 1950, XL: 2700 },
        availableSizes: ["Small", "Medium", "Large", "XL"],
        extraToppingRates: { Small: 150, Medium: 200, Large: 300, XL: 400 },
        image: "https://images.unsplash.com/photo-1588315029754-2dd089d39a1a?auto=format&fit=crop&w=1000&q=80"
      },
      {
        id: "pizza-alfredo",
        name: "Alfredo Pizza",
        category: "Special Pizza - Slice of the Heaven",
        desc: "Silky Alfredo mushroom sauce base, hand-carved roasted chicken, button mushrooms, and melted Italian cheeses.",
        tag: "Gourmet White",
        prices: { Large: 1950, XL: 2700 },
        availableSizes: ["Large", "XL"],
        extraToppingRates: { Large: 300, XL: 400 },
        image: "https://images.unsplash.com/photo-1528137871618-79d2761e3fd5?auto=format&fit=crop&w=1000&q=80"
      },
      {
        id: "pizza-kabab-popper",
        name: "Kabab Popper Pizza",
        category: "Special Pizza - Slice of the Heaven",
        desc: "Signature crust lined with juicy mini seekh kabab popper bites around the perimeter, loaded chicken center.",
        tag: "Popper Crust",
        prices: { Large: 1950, XL: 2700 },
        availableSizes: ["Large", "XL"],
        extraToppingRates: { Large: 300, XL: 400 },
        image: "https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?auto=format&fit=crop&w=1000&q=80"
      },
      {
        id: "pizza-stuffed-crust",
        name: "Stuffed Crust Supreme",
        category: "Special Pizza - Slice of the Heaven",
        desc: "Outer crust ring fully stuffed with molten mozzarella & cheddar cheese string that pulls with every bite.",
        tag: "Cheese Pull",
        prices: { Large: 2250, XL: 2900 },
        availableSizes: ["Large", "XL"],
        extraToppingRates: { Large: 300, XL: 400 },
        image: "https://images.unsplash.com/photo-1564936281291-294551497d81?auto=format&fit=crop&w=1000&q=80"
      },
      {
        id: "pizza-crown-crust",
        name: "Crown Crust Pizza",
        category: "Special Pizza - Slice of the Heaven",
        desc: "Majestic folded crown peaks filled with seasoned cream cheese & chicken kababs, surrounding a lavish topping center.",
        tag: "Signature Royal",
        prices: { Large: 2250, XL: 2900 },
        availableSizes: ["Large", "XL"],
        extraToppingRates: { Large: 300, XL: 400 },
        image: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&w=1000&q=80"
      }
    ]
  },

  burgers: {
    id: "burgers",
    name: "Gourmet Burgers",
    badge: "Smash & Grilled",
    description: "Handcrafted patties, freshly toasted brioche buns, crisp organic greens, and signature secret sauces.",
    items: [
      {
        id: "burger-classic-patty",
        name: "Classic Patty Burger",
        category: "Chicken Burger",
        desc: "Golden crispy seasoned chicken patty, fresh crunchy iceberg lettuce, and smooth creamy garlic mayo on toasted bun.",
        tag: "Everyday Favorite",
        prices: { Single: 350 },
        availableSizes: ["Single"],
        mealPrice: 250,
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1000&q=80"
      },
      {
        id: "burger-chicken-chapli",
        name: "Chicken Chapli Kabab Burger",
        category: "Specialty Fusion",
        desc: "Aromatic spiced chicken chapli kabab patty, crunchy lettuce, sliced red onions, and house special green chilli chutney sauce.",
        tag: "Desi Spice",
        prices: { Single: 420 },
        availableSizes: ["Single"],
        mealPrice: 250,
        image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1000&q=80"
      },
      {
        id: "burger-zinger",
        name: "Zinger Burger",
        category: "Crispy Burger",
        desc: "Ultra-crispy double-dredged chicken breast fillet seasoned with secret spices, shredded lettuce, and rich mayonnaise.",
        tag: "Crispy Legend",
        prices: { Single: 480 },
        availableSizes: ["Single"],
        mealPrice: 250,
        image: "https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?auto=format&fit=crop&w=1000&q=80"
      },
      {
        id: "burger-peri-peri-grilled",
        name: "Peri Peri Grilled Burger",
        category: "Grilled Burger",
        desc: "Char-grilled tender breast fillet marinated in zesty peri-peri peppers, crisp lettuce, ripe tomatoes, onions & tangy peri sauce.",
        tag: "Flame Grilled",
        prices: { Single: 650 },
        availableSizes: ["Single"],
        mealPrice: 250,
        image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=1000&q=80"
      },
      {
        id: "burger-fillet-chicken",
        name: "Fillet Chicken Burger",
        category: "Crispy Burger",
        desc: "Deep fried golden breast fillet seasoned to perfection, shredded garden lettuce, and our house special garlic dip sauce.",
        tag: "Garlic Lover",
        prices: { Single: 720 },
        availableSizes: ["Single"],
        mealPrice: 250,
        image: "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?auto=format&fit=crop&w=1000&q=80"
      },
      {
        id: "burger-loaded-grilled",
        name: "Loaded Grilled Chicken Burger",
        category: "Grilled Burger",
        desc: "2 Whole grilled chicken breast fillets stacked high with fresh lettuce, sliced tomatoes, onions, and special house sauce.",
        tag: "Double Stack",
        prices: { Single: 790 },
        availableSizes: ["Single"],
        mealPrice: 250,
        image: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?auto=format&fit=crop&w=1000&q=80"
      },
      {
        id: "burger-mighty-zinger",
        name: "Mighty Zinger Burger",
        category: "Crispy Monster",
        desc: "2 Gigantic crunchy zinger fillets stacked tall, double iceberg lettuce, creamy mayo, nestled in a sesame-seeded jumbo bun.",
        tag: "Mega Crunchy",
        prices: { Single: 790 },
        availableSizes: ["Single"],
        mealPrice: 250,
        image: "https://images.unsplash.com/photo-1561758033-d89a9ad46330?auto=format&fit=crop&w=1000&q=80"
      },
      {
        id: "burger-the-little-boy",
        name: "The Little Boy",
        category: "Stuffed Cheese Wonder",
        desc: "Center-filled thick patty bursting with molten mozzarella & cheddar cheese, hand-torn crisp lettuce, and special sauces.",
        tag: "Cheese Exploder",
        prices: { Single: 820 },
        availableSizes: ["Single"],
        mealPrice: 250,
        image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=1000&q=80"
      },
      {
        id: "burger-fish",
        name: "Fish Burger",
        category: "Seafood Delight",
        desc: "Crispy battered ocean fish fillet, tender lettuce, and silky tartar garlic sauce inside a warm toasted bun.",
        tag: "Ocean Catch",
        prices: { Single: 850 },
        availableSizes: ["Single"],
        mealPrice: 250,
        image: "https://images.unsplash.com/photo-1521305916504-4a1121188589?auto=format&fit=crop&w=1000&q=80"
      },
      {
        id: "burger-american-grill-cheese",
        name: "American Grill Cheese Burger",
        category: "Grilled Deluxe",
        desc: "3 Tender grilled chicken breast fillets, freshly chopped iceberg lettuce, special house sauce, and 2 thick slices of melted yellow cheddar.",
        tag: "Triple Layered",
        prices: { Single: 850 },
        availableSizes: ["Single"],
        mealPrice: 250,
        image: "https://images.unsplash.com/photo-1582196016295-f8c8bd4b3e99?auto=format&fit=crop&w=1000&q=80"
      },
      {
        id: "burger-fiery-chicken-fillet",
        name: "Fiery Chicken Fillet",
        category: "Spicy Fillet",
        desc: "Deep fried breast fillet coated in spicy hot marinade, pickled jalapenos, freshly chopped lettuce, and fiery garlic mayo.",
        tag: "Extremely Spicy",
        prices: { Single: 850 },
        availableSizes: ["Single"],
        mealPrice: 250,
        image: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=1000&q=80"
      },
      {
        id: "burger-original-beef-smash",
        name: "Original Beef Smash Burger",
        category: "Smash Beef",
        desc: "Two fresh 100% prime beef patties smashed sizzling hot on the flat-top with crisp lacy edges, double American cheese, and pickles.",
        tag: "Double Smash",
        prices: { Single: 1050 },
        availableSizes: ["Single"],
        mealPrice: 250,
        image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1000&q=80"
      },
      {
        id: "burger-beef-monstrosity",
        name: "Beef Monstrosity Smash Burger",
        category: "Mega Smash",
        desc: "4 Colossal smashed beef patties layered with 4 slices of melted yellow American cheese, special sauce, and caramelized onions.",
        tag: "The Beast (4 Patties)",
        prices: { Single: 1580 },
        availableSizes: ["Single"],
        mealPrice: 250,
        image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=1000&q=80"
      }
    ]
  },

  wraps: {
    id: "wraps",
    name: "Wraps & Shawarma",
    badge: "Toasted & Rolled",
    description: "Authentic Arabic shawarma, loaded crisp tortillas, and fresh stuffed pita bread rolls with homemade garlic toum.",
    items: [
      {
        id: "shawarma-classic",
        name: "Classic Shawarma",
        category: "Arabic Shawarma",
        desc: "Spit-roasted chicken slivers, pickled cucumbers, crispy fries, and rich creamy garlic toum sauce rolled in fresh pita bread.",
        tag: "Authentic Taste",
        prices: { Regular: 320 },
        availableSizes: ["Regular"],
        image: "https://images.unsplash.com/photo-1561651823-34feb02250e4?auto=format&fit=crop&w=1000&q=80"
      },
      {
        id: "shawarma-crispy-roll",
        name: "Crispy Roll",
        category: "Rolls",
        desc: "Golden fried crunchy chicken strips with spicy mayo and pickled onion rolled in a flaky griddled flatbread.",
        tag: "Crunchy Bite",
        prices: { Regular: 380 },
        availableSizes: ["Regular"],
        image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=1000&q=80"
      },
      {
        id: "shawarma-paratha-kabab",
        name: "Paratha Kabab",
        category: "Desi Roll",
        desc: "Charcoal seekh kabab wrapped in a golden crispy flaky paratha with sliced red onions and tangy mint chutney sauce.",
        tag: "Desi Classic",
        prices: { Regular: 400 },
        availableSizes: ["Regular"],
        image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1000&q=80"
      },
      {
        id: "shawarma-zinger",
        name: "Zinger Shawarma",
        category: "Fusion Shawarma",
        desc: "Crunchy fried zinger chicken chunks combined with Arabic garlic sauce, iceberg lettuce, and cheese inside a toasted wrap.",
        tag: "Zinger Fusion",
        prices: { Regular: 480 },
        availableSizes: ["Regular"],
        image: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=1000&q=80"
      },
      {
        id: "shawarma-twister",
        name: "Twister Wrap",
        category: "Tortilla Wrap",
        desc: "Tender chicken fillets, diced tomatoes, fresh lettuce, and pepper mayo rolled tightly in a warm soft tortilla.",
        tag: "Fresh & Crisp",
        prices: { Regular: 520 },
        availableSizes: ["Regular"],
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=80"
      },
      {
        id: "shawarma-donner",
        name: "Donner Kebab Wrap",
        category: "Turkish Donner",
        desc: "Carved seasoned donner meat, shredded cabbage, tomatoes, garlic mayo, and chili drizzle in a toasted flatbread pocket.",
        tag: "Turkish Style",
        prices: { Regular: 600 },
        availableSizes: ["Regular"],
        image: "https://images.unsplash.com/photo-1561651823-34feb02250e4?auto=format&fit=crop&w=1000&q=80"
      },
      {
        id: "shawarma-arabian",
        name: "Arabian Shawarma",
        category: "Special Shawarma",
        desc: "Double meat portion of Lebanese spiced chicken, pickles, French fries inside, and authentic heavy garlic dip sauce.",
        tag: "Loaded Arabic",
        prices: { Regular: 650 },
        availableSizes: ["Regular"],
        image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=1000&q=80"
      },
      {
        id: "shawarma-grilled-chicken-wrap",
        name: "Grilled Chicken Wrap",
        category: "Healthy Grill",
        desc: "Smoky herb-marinated grilled chicken strips, crisp salad mix, olives, and light yogurt dressing wrapped in flatbread.",
        tag: "Healthy Grill",
        prices: { Regular: 650 },
        availableSizes: ["Regular"],
        image: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=1000&q=80"
      },
      {
        id: "shawarma-tortilla-wrap",
        name: "Tortilla Wrap (Flavored)",
        category: "Premium Wrap",
        desc: "Jumbo crispy tortilla wrap loaded with chicken and greens. Choose sauce: Garlic Mayo / Chipotle / Hot Sriracha.",
        tag: "Sauce Choice",
        prices: { Regular: 720 },
        availableSizes: ["Regular"],
        image: "https://images.unsplash.com/photo-1561651823-34feb02250e4?auto=format&fit=crop&w=1000&q=80"
      }
    ]
  },

  broast: {
    id: "broast",
    name: "Injected Broast & Starters",
    badge: "Deep Fried Golden",
    description: "House special injected marinated chicken fried under pressure for extreme juiciness, plus loaded loaded fries and hot sides.",
    items: [
      {
        id: "broast-half",
        name: "Half Broast (House Special)",
        category: "Broast Special",
        desc: "Thigh + Chest + Leg + Wing injected with spicy seasoning broth, served with Golden Fries, Signature Garlic Sauce, Dinner Roll & 0.5L Coke.",
        tag: "House Special (4 Pcs)",
        prices: { "Half Meal": 1300 },
        availableSizes: ["Half Meal"],
        image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=1000&q=80"
      },
      {
        id: "broast-full",
        name: "Full Broast (House Special)",
        category: "Broast Special",
        desc: "2 Thighs + 2 Chests + 2 Legs + 2 Wings, Large Fries, 2 Garlic Sauce Dips, 2 Dinner Rolls & 1.5L Coke bottle for the whole feast.",
        tag: "Family Feast (8 Pcs)",
        prices: { "Full Feast": 2550 },
        availableSizes: ["Full Feast"],
        image: "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=1000&q=80"
      },
      {
        id: "fries-plain",
        name: "Plain Crispy Fries",
        category: "Fries",
        desc: "Golden salted potato fries fried to a crunchy exterior and fluffy interior.",
        tag: "Classic Side",
        prices: { Large: 250, Family: 430 },
        availableSizes: ["Large", "Family"],
        image: "https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=1000&q=80"
      },
      {
        id: "fries-masala",
        name: "Masala Fries",
        category: "Fries",
        desc: "Golden French fries tossed in our secret tangy chatpata spice blend.",
        tag: "Spicy Tangy",
        prices: { Large: 270, Family: 450 },
        availableSizes: ["Large", "Family"],
        image: "https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?auto=format&fit=crop&w=1000&q=80"
      },
      {
        id: "fries-garlic-mayo",
        name: "Garlic Mayo Fries",
        category: "Fries",
        desc: "Fresh fries smothered with our rich signature garlic mayonnaise sauce and green herb garnishing.",
        tag: "Saucy Delight",
        prices: { Regular: 380 },
        availableSizes: ["Regular"],
        image: "https://images.unsplash.com/photo-1585109649139-366815a0d713?auto=format&fit=crop&w=1000&q=80"
      },
      {
        id: "fries-baked-cheese",
        name: "Baked Cheese Fries",
        category: "Fries",
        desc: "Oven-baked fries smothered in a thick blanket of bubbling melted mozzarella and cheddar cheese.",
        tag: "Cheesy Overload",
        prices: { Regular: 490 },
        availableSizes: ["Regular"],
        image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=1000&q=80"
      },
      {
        id: "fries-jungly",
        name: "Jungly Fries",
        category: "Fries",
        desc: "Loaded mountain of fries topped with spicy diced chicken, jalapenos, cheese sauce, olives, and special drizzle.",
        tag: "Fully Loaded",
        prices: { Regular: 790 },
        availableSizes: ["Regular"],
        image: "https://images.unsplash.com/photo-1585109649139-366815a0d713?auto=format&fit=crop&w=1000&q=80"
      },
      {
        id: "starters-hot-wings",
        name: "Crispy Hot Wings",
        category: "Starters",
        desc: "Spicy crunch battered chicken wings fried crisp and dusted with hot red chili seasoning.",
        tag: "Hot & Crispy",
        prices: { "6 Pcs": 480, "12 Pcs": 900 },
        availableSizes: ["6 Pcs", "12 Pcs"],
        image: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=1000&q=80"
      },
      {
        id: "starters-mozerella-sticks",
        name: "Mozzarella Cheese Sticks",
        category: "Starters",
        desc: "6 Golden breaded sticks oozing with stretchy melted mozzarella cheese, served with marinara dip.",
        tag: "Cheese Pull",
        prices: { "6 Pcs": 790 },
        availableSizes: ["6 Pcs"],
        image: "https://images.unsplash.com/photo-1548340748-6d2b7d7da280?auto=format&fit=crop&w=1000&q=80"
      },
      {
        id: "starters-korean-fried-wings",
        name: "Korean Fried Wings",
        category: "Starters",
        desc: "8 Crispy double-fried wings glazed in sweet and spicy gochujang chili sauce sprinkled with sesame seeds.",
        tag: "Korean Sweet & Spicy",
        prices: { "8 Pcs": 850 },
        availableSizes: ["8 Pcs"],
        image: "https://images.unsplash.com/photo-1527477321005-4d45d724b8c4?auto=format&fit=crop&w=1000&q=80"
      },
      {
        id: "starters-peri-bites",
        name: "Peri Bites",
        category: "Starters",
        desc: "6 Fresh green chilies stuffed with seasoned chicken and creamy cheese, crumb coated and golden fried.",
        tag: "Spicy Pop",
        prices: { "6 Pcs": 590 },
        availableSizes: ["6 Pcs"],
        image: "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=1000&q=80"
      }
    ]
  },

  steaks: {
    id: "steaks",
    name: "Steaks, Pastas & Platters",
    badge: "Sizzling Gourmet",
    description: "Sizzling prime grilled steaks, rich Italian pasta bowls, and hearty platters served hot.",
    items: [
      {
        id: "steak-peri-peri",
        name: "Peri Peri Sizzling Steak",
        category: "Steaks",
        desc: "Flame grilled chicken/beef steak topped with fiery peri peri pepper sauce. Served with Rice or Fries & 500ml Drink.",
        tag: "Sizzling Hot",
        prices: { "Full Meal": 1350 },
        availableSizes: ["Full Meal"],
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=80"
      },
      {
        id: "steak-wild-mushroom",
        name: "Wild Mushroom Steak",
        category: "Steaks",
        desc: "Grilled fillet bathed in velvety creamy wild button mushroom sauce. Served with Rice or Fries & 500ml Drink.",
        tag: "Creamy Gourmet",
        prices: { "Full Meal": 1350 },
        availableSizes: ["Full Meal"],
        image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1000&q=80"
      },
      {
        id: "steak-jalapeno",
        name: "Jalapeno Steak",
        category: "Steaks",
        desc: "Char-grilled steak draped in rich white jalapeno cheese cream sauce with pickled peppers. Served with Rice or Fries & 500ml Drink.",
        tag: "Zesty Kick",
        prices: { "Full Meal": 1350 },
        availableSizes: ["Full Meal"],
        image: "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=1000&q=80"
      },
      {
        id: "pasta-fettuccine-alfredo",
        name: "Fettuccine Alfredo Pasta",
        category: "Pasta & Noodles",
        desc: "Ribbon fettuccine tossed in rich garlic parmesan cream sauce, grilled chicken strips, and freshly cracked black pepper.",
        tag: "Italian Classic",
        prices: { Bowl: 1090 },
        availableSizes: ["Bowl"],
        image: "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?auto=format&fit=crop&w=1000&q=80"
      },
      {
        id: "pasta-mac-and-cheese",
        name: "Mac & Cheese Skillet",
        category: "Pasta & Noodles",
        desc: "Elbow macaroni enveloped in velvety cheddar & mozzarella cheese sauce, baked with a golden breadcrumb crust.",
        tag: "Ultra Cheesy",
        prices: { Bowl: 1090 },
        availableSizes: ["Bowl"],
        image: "https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&w=1000&q=80"
      },
      {
        id: "platter-turkish",
        name: "Turkish Platter",
        category: "Platters",
        desc: "Spiced Turkish grilled chicken skewers served over aromatic rice with salad, garlic toum sauce & warm pita bread.",
        tag: "Turkish Feast",
        prices: { Platter: 850 },
        availableSizes: ["Platter"],
        image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1000&q=80"
      },
      {
        id: "platter-fish-and-chips",
        name: "Fish & Chips",
        category: "Platters",
        desc: "4 Pieces golden crispy battered sea fish fillets served with a mountain of large fries, tartar sauce & lemon wedge.",
        tag: "Crispy Seafood",
        prices: { Platter: 1450 },
        availableSizes: ["Platter"],
        image: "https://images.unsplash.com/photo-1579208030886-b937da0925dc?auto=format&fit=crop&w=1000&q=80"
      }
    ]
  },

  drinks: {
    id: "drinks",
    name: "Chilled Drinks & Shakes",
    badge: "Iced & Blended",
    description: "Ice-cream thick shakes, refreshing coolers, and barista beverages to pair with your feast.",
    items: [
      {
        id: "drink-mint-margarita",
        name: "Mint Margarita",
        category: "Coolers",
        desc: "Crushed fresh garden mint, tangy fresh lime juice, sparkling soda, and rock salt served ice cold with lemon wheels.",
        tag: "Refreshing Zest",
        prices: { Regular: 200 },
        availableSizes: ["Regular"],
        image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=1000&q=80"
      },
      {
        id: "drink-lemonade",
        name: "Fresh Lemonade",
        category: "Coolers",
        desc: "Hand-squeezed citrus lemons, pure cane sugar, sparkling soda, and crushed ice.",
        tag: "Cool Citrus",
        prices: { Regular: 200 },
        availableSizes: ["Regular"],
        image: "https://images.unsplash.com/photo-1621263764928-df1444c5e859?auto=format&fit=crop&w=1000&q=80"
      },
      {
        id: "drink-lotus-shake",
        name: "Lotus Biscoff Ice-Cream Shake",
        category: "Thick Shake",
        desc: "Creamy vanilla gelato blended with genuine Lotus Biscoff spread and crushed caramelized biscuit crumbles with whipped cream.",
        tag: "Bestseller Shake",
        prices: { Regular: 550 },
        availableSizes: ["Regular"],
        image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=1000&q=80"
      },
      {
        id: "drink-chocolate-shake",
        name: "Chocolate Ice-Cream Shake",
        category: "Thick Shake",
        desc: "Rich Belgian chocolate ice cream blitzed with cold milk, chocolate fudge swirl, and topped with chocolate curls.",
        tag: "Decadent Choco",
        prices: { Regular: 480 },
        availableSizes: ["Regular"],
        image: "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=1000&q=80"
      },
      {
        id: "drink-strawberry-shake",
        name: "Strawberry Ice-Cream Shake",
        category: "Thick Shake",
        desc: "Sweet strawberry ice cream blended with crushed ripe berries and finished with a fluffy whipped cream dome.",
        tag: "Berry Sweet",
        prices: { Regular: 480 },
        availableSizes: ["Regular"],
        image: "https://images.unsplash.com/photo-1553787499-6f9133860278?auto=format&fit=crop&w=1000&q=80"
      },
      {
        id: "drink-cookie-cream",
        name: "Cookie and Creamy Shake",
        category: "Thick Shake",
        desc: "Crunchy Oreo cookies pounded into velvety vanilla ice cream and whole milk with sweet chocolate drizzle.",
        tag: "Oreo Crunch",
        prices: { Regular: 550 },
        availableSizes: ["Regular"],
        image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=1000&q=80"
      },
      {
        id: "drink-double-chocolate",
        name: "Double Chocolate Shake",
        category: "Thick Shake",
        desc: "Double dose of dark chocolate sauce, rich chocolate chips, and premium Dutch cocoa ice cream.",
        tag: "Maximum Cocoa",
        prices: { Regular: 550 },
        availableSizes: ["Regular"],
        image: "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=1000&q=80"
      },
      {
        id: "drink-vanilla-shake",
        name: "Vanilla Ice-Cream Shake",
        category: "Thick Shake",
        desc: "Classic French Madagascar vanilla ice cream shake blended smooth and creamy.",
        tag: "Timeless Vanilla",
        prices: { Regular: 480 },
        availableSizes: ["Regular"],
        image: "https://images.unsplash.com/photo-1541658016709-82535e94bc69?auto=format&fit=crop&w=1000&q=80"
      }
    ]
  },

  deals: {
    id: "deals",
    name: "Value Deals & Combos",
    badge: "Save Big",
    description: "Curated value feast combos designed for couples, friends, and family gatherings.",
    items: [
      {
        id: "deal-for-two",
        name: "Deal For Two",
        category: "Pizza Combo",
        desc: "2 Small Pizzas (Regular Flavours) + 1 Signature Dip Sauce + 500ML Chilled Soft Drink bottle.",
        tag: "Couple Special",
        prices: { Combo: 1400 },
        availableSizes: ["Combo"],
        image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1000&q=80"
      },
      {
        id: "deal-burger-box-1",
        name: "Burger Deal Box - 1",
        category: "Burger Combo",
        desc: "4 Crispy Patty Burgers + 1.5 Litre Jumbo Soft Drink bottle. Perfect budget feast!",
        tag: "Party Box",
        prices: { Combo: 1450 },
        availableSizes: ["Combo"],
        image: "https://images.unsplash.com/photo-1610614819513-58e34989848b?auto=format&fit=crop&w=1000&q=80"
      },
      {
        id: "deal-burger-box-2",
        name: "Burger Deal Box - 2",
        category: "Burger Combo",
        desc: "4 Crunchy Zinger Burgers + 1 Family Bucket Fries + 1.5 Litre Jumbo Soft Drink.",
        tag: "Mega Zinger Feast",
        prices: { Combo: 2200 },
        availableSizes: ["Combo"],
        image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=1000&q=80"
      },
      {
        id: "deal-for-four",
        name: "Deal For Four",
        category: "Pizza Combo",
        desc: "2 Medium Pizzas (Regular Flavours) + 2 Dip Sauces + 1 Litre Soft Drink.",
        tag: "4 Person Feast",
        prices: { Combo: 2700 },
        availableSizes: ["Combo"],
        image: "https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?auto=format&fit=crop&w=1000&q=80"
      },
      {
        id: "deal-family",
        name: "Family Deal",
        category: "Pizza Combo",
        desc: "2 Large Pizzas (Regular Flavours) + 4 Dip Sauces + 1.5 Litre Large Soft Drink.",
        tag: "Grand Family Combo",
        prices: { Combo: 3500 },
        availableSizes: ["Combo"],
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1000&q=80"
      }
    ]
  },

  addOns: [
    { id: "addon-cheese", name: "Extra Cheese Slice", price: 70 },
    { id: "addon-rice", name: "Fragrant Butter Rice", price: 350 },
    { id: "addon-chipotle-dip", name: "Chipotle Dip Sauce", price: 60 },
    { id: "addon-garlic-mayo-dip", name: "Garlic Mayo Dip Sauce", price: 60 },
    { id: "addon-peri-dip", name: "Peri Peri Dip Sauce", price: 60 },
    { id: "addon-cocktail-dip", name: "Cocktail Dip Sauce", price: 60 },
    { id: "addon-olives", name: "Extra Black Olives", price: 60 },
    { id: "addon-mushrooms", name: "Extra Button Mushrooms", price: 60 },
    { id: "addon-jalapenos", name: "Extra Pickled Jalapenos", price: 60 }
  ]
};
