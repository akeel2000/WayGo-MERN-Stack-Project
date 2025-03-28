import React from "react";
import { useParams } from "react-router-dom";
import { FaArrowLeft, FaCalendarAlt, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const blogPosts = [
  {
    id: 1,
    title: 'Exploring the Ancient City of Sigiriya',
    content: 'Sigiriya, the legendary "Lion Rock", is an ancient rock fortress with stunning frescoes and breathtaking views. This UNESCO World Heritage Site offers a glimpse into Sri Lanka\'s rich history.',
    fullContent: [
      'Sigiriya, often referred to as the "Eighth Wonder of the World", stands majestically 200 meters above the surrounding plain. This ancient rock fortress dates back to the 5th century during the reign of King Kashyapa (477–495 AD).',
      'The site combines natural beauty with human ingenuity. As you ascend the rock, you\'ll encounter the famous Sigiriya frescoes - ancient paintings of celestial maidens that have survived for over 1,500 years.',
      'Halfway up the rock, you\'ll pass through the Lion\'s Paw Terrace, where only the massive paws remain of what was once an enormous lion statue that gave Sigiriya its name ("Lion Rock").',
      'The summit covers about 1.6 hectares and contains the ruins of the royal palace, gardens, and reservoirs. The view from the top is simply breathtaking, offering panoramic views of the surrounding jungle.',
      'At the base of the rock lie the beautifully symmetrical water gardens, boulder gardens, and terrace gardens that demonstrate sophisticated hydraulic technology and landscaping skills.'
    ],
    author: 'Travel Sri Lanka',
    date: 'March 15, 2024',
    image: 'https://images.unsplash.com/photo-1582139329536-e7284fece509?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80',
    location: 'Sigiriya, Central Province',
    duration: 'Half-day tour',
    tips: [
      'Visit early morning (7am) to avoid crowds and heat',
      'Wear comfortable shoes for the climb',
      'Bring water and sunscreen',
      'Hire a guide at the entrance for detailed explanations'
    ]
  },
  {
    id: 2,
    title: 'Beaches of Mirissa: A Tropical Paradise',
    content: 'Mirissa boasts some of Sri Lanka\'s most beautiful beaches with golden sands and turquoise waters. Perfect for whale watching, surfing, or simply relaxing under palm trees.',
    fullContent: [
      'Mirissa has emerged as one of Sri Lanka\'s premier beach destinations, offering a perfect blend of relaxation and adventure. The crescent-shaped beach is lined with coconut palms and dotted with charming beach cafes.',
      'From November to April, Mirissa becomes one of the best places in the world for whale watching. Blue whales, sperm whales, and dolphins are frequently spotted just a few kilometers from the shore.',
      'The surf scene in Mirissa is vibrant but more relaxed than in Hikkaduwa or Arugam Bay, making it ideal for beginners. Secret Beach, a small cove just west of the main beach, offers particularly good waves.',
      'As the sun sets, the beach transforms with fire dancers and beach parties, though it never gets as rowdy as some other Sri Lankan party beaches.',
      'For a more secluded experience, take a short tuk-tuk ride to nearby beaches like Polhena or Weligama, each offering their own unique charm.'
    ],
    author: 'Island Explorers',
    date: 'April 2, 2024',
    image: 'https://images.unsplash.com/photo-1562613521-87f9a8b0e532?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    location: 'Mirissa, Southern Province',
    duration: '2-3 days recommended',
    tips: [
      'Best whale watching months: December-March',
      'Try the fresh seafood at beachside restaurants',
      'Negotiate prices for water sports upfront',
      'Respect local customs - avoid public nudity'
    ]
  },
  {
    id: 3,
    title: 'Tea Plantations of Nuwara Eliya',
    content: 'The rolling hills of Nuwara Eliya are covered in lush tea plantations that produce some of the world\'s finest tea. Take a factory tour and enjoy a fresh brew.',
    fullContent: [
      'Nuwara Eliya, often called "Little England", sits at an elevation of 1,868m (6,128ft) in the Central Highlands. The cool climate and misty hills create perfect conditions for growing high-quality tea.',
      'The region\'s tea plantations date back to the 19th century when British planters established the first estates. Today, you can visit working plantations like Pedro Tea Estate or Labookellie Tea Centre to see the entire tea-making process from leaf to cup.',
      'A typical tea factory tour shows you the withering, rolling, fermenting, drying, cutting, and sorting processes. The highlight is always the tasting session where you can sample different grades of Ceylon tea.',
      'Beyond the plantations, Nuwara Eliya offers colonial-era architecture, a picturesque golf course, and stunning hikes to waterfalls like Lover\'s Leap or Devon Falls.',
      'The annual Nuwara Eliya Season in April brings horse races, flower shows, and a glimpse into Sri Lanka\'s colonial past.'
    ],
    author: 'Ceylon Travel Diaries',
    date: 'April 10, 2024',
    image: 'https://images.unsplash.com/photo-1599391409945-6e7a4e72dc4f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    location: 'Nuwara Eliya, Central Province',
    duration: '1-2 days',
    tips: [
      'Bring a jacket - temperatures can drop to 10°C (50°F)',
      'Visit a tea factory in the morning when processing is most active',
      'Try "high grown" orange pekoe tea varieties',
      'Combine with a visit to Horton Plains National Park'
    ]
  },
  {
    id: 4,
    title: 'Wildlife Safari in Yala National Park',
    content: 'Yala National Park offers incredible opportunities to spot leopards, elephants, and hundreds of bird species. Experience Sri Lanka\'s diverse wildlife.',
    fullContent: [
      'Yala National Park is Sri Lanka\'s most famous wildlife sanctuary, covering nearly 130,000 hectares of dry zone jungle, grasslands, and lagoons. It has the highest leopard density in the world, making it one of the best places to spot these elusive cats.',
      'The park is divided into five blocks, with Block 1 being the most popular for safaris. A typical safari starts before dawn when animals are most active. In addition to leopards, you might see elephants, sloth bears, crocodiles, and over 200 bird species.',
      'Yala\'s varied ecosystems support an incredible diversity of life. The coastal area features stunning rock formations and beaches where turtles nest, while the inland areas have ancient reservoirs that attract large herds of elephants.',
      'The best time to visit is between February and July when water levels are low and animals congregate around remaining water holes. Early morning and late afternoon safaris offer the best wildlife viewing opportunities.',
      'Responsible tourism is crucial in Yala. Always choose ethical safari operators who maintain proper distance from animals and follow park regulations.'
    ],
    author: 'Wildlife Adventures',
    date: 'April 18, 2024',
    image: 'https://images.unsplash.com/photo-1581668180100-8c7688e224e0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    location: 'Yala, Southern Province',
    duration: 'Full-day safari',
    tips: [
      'Book safaris with reputable operators in advance',
      'Bring binoculars and a good camera with zoom lens',
      'Wear neutral-colored clothing',
      'Maintain silence during sightings'
    ]
  },
  {
    id: 5,
    title: 'The Sacred City of Kandy',
    content: 'Kandy, home to the Temple of the Sacred Tooth Relic, is a cultural hub surrounded by mountains and lakes. Experience traditional dance performances.',
    fullContent: [
      'Kandy, Sri Lanka\'s last royal capital, is nestled among misty hills and centered around a picturesque lake. The city is most famous for the Temple of the Sacred Tooth Relic (Sri Dalada Maligawa), which houses Buddha\'s tooth and is the country\'s most important Buddhist shrine.',
      'The temple complex is a masterpiece of Kandyan architecture with intricate wood carvings, painted ceilings, and golden roofs. The evening puja (offering) ceremony is a magical experience with drumming and chanting.',
      'Kandy is also known for its vibrant arts scene. The Kandyan Cultural Show features traditional dance forms like the peacock dance and fire walking, accompanied by energetic drumming.',
      'The Royal Botanical Gardens in nearby Peradeniya showcase exotic tropical plants spread across 60 hectares. Don\'t miss the giant Java fig tree with its sprawling roots.',
      'Kandy\'s climate is cooler than the lowlands, making it pleasant for exploring the city\'s colonial-era buildings, bustling markets, and the scenic Udawattakele Forest Reserve.'
    ],
    author: 'Cultural Journeys',
    date: 'April 25, 2024',
    image: 'https://images.unsplash.com/photo-1585323676128-3c4f1e41f68d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    location: 'Kandy, Central Province',
    duration: '1-2 days',
    tips: [
      'Dress modestly when visiting temples (cover shoulders and knees)',
      'Attend the evening puja ceremony at the Temple of the Tooth',
      'Visit the tea museum to learn about Ceylon tea history',
      'Try Kandy\'s famous yogurt and sweets'
    ]
  },
  {
    id: 6,
    title: 'Galle Fort: Colonial Charm',
    content: 'The 17th-century Galle Fort is a UNESCO site with Dutch-colonial buildings, boutique shops, and scenic ocean views. Walk along the ramparts at sunset.',
    fullContent: [
      'Galle Fort is a living museum of colonial architecture, with its massive stone walls enclosing a grid of streets lined with Dutch-era houses, churches, and mosques. Built by the Portuguese in the 16th century and extensively fortified by the Dutch, it\'s the best-preserved colonial fort in Asia.',
      'Walking along the 400-year-old ramparts at sunset is a quintessential Galle experience. The views over the Indian Ocean are spectacular, and you\'ll see locals and tourists alike gathering to enjoy the evening breeze.',
      'Inside the fort, you\'ll find boutique hotels, art galleries, antique shops, and excellent restaurants housed in beautifully restored colonial buildings. The National Maritime Museum and the Dutch Reformed Church are particularly interesting.',
      'Galle\'s blend of European architecture and South Asian traditions creates a unique cultural fusion. The fort remains a working community with schools, homes, and businesses operating within its walls.',
      'Just outside the fort, the vibrant Galle city offers bustling markets, cricket matches at the international stadium, and access to beautiful beaches like Unawatuna and Dalawella.'
    ],
    author: 'Historic Trails',
    date: 'May 3, 2024',
    image: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1530&q=80',
    location: 'Galle, Southern Province',
    duration: '1 day',
    tips: [
      'Explore early morning or late afternoon to avoid heat',
      'Hire a guide for historical insights',
      'Try the fort\'s famous "short eats" (local snacks)',
      'Visit the Sunday market for local crafts'
    ]
  },
];

const BlogRead = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find the blog post with the matching ID
  const post = blogPosts.find(post => post.id === parseInt(id));

  if (!post) {
    return <div className="flex items-center justify-center h-screen bg-amber-50">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-amber-600 mb-4">Post Not Found</h1>
        <p className="text-gray-700 mb-6">The blog post you're looking for doesn't exist or has been removed.</p>
        <button
          onClick={() => navigate('/blog')}
          className="px-6 py-2 bg-gradient-to-r from-amber-400 to-orange-500 text-white rounded-lg hover:from-amber-500 hover:to-orange-600 transition-all"
        >
          Back to Blog
        </button>
      </div>
    </div>;
  }

  return (
    <div className="bg-amber-50 text-gray-800 min-h-screen">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate('/blog')}
            className="flex items-center text-amber-600 hover:text-amber-800 transition-colors"
          >
            <FaArrowLeft className="mr-2" />
            Back to Blog
          </button>
          <div className="bg-gradient-to-r from-amber-400 to-orange-500 text-white text-sm font-semibold px-3 py-1 rounded-full">
            Travel Guide
          </div>
        </div>
      </nav>

      {/* Hero Image */}
      <div className="relative h-96 w-full overflow-hidden">
        <img
          className="w-full h-full object-cover"
          src={post.image}
          alt={post.title}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{post.title}</h1>
          <div className="flex items-center text-amber-200">
            <FaUser className="mr-1" />
            <span className="mr-4">{post.author}</span>
            <FaCalendarAlt className="mr-1" />
            <span>{post.date}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Location and Duration */}
          <div className="p-6 border-b border-amber-100 bg-amber-50">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-semibold text-amber-600 uppercase tracking-wider">Location</h3>
                <p className="mt-1 text-lg font-medium text-gray-900">{post.location}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-amber-600 uppercase tracking-wider">Recommended Duration</h3>
                <p className="mt-1 text-lg font-medium text-gray-900">{post.duration}</p>
              </div>
            </div>
          </div>

          {/* Article Content */}
          <article className="prose prose-lg max-w-none p-6">
            <p className="lead text-gray-600 text-xl">{post.content}</p>

            {post.fullContent.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}

            {/* Travel Tips */}
            <div className="mt-12 bg-amber-50 p-6 rounded-lg">
              <h3 className="text-2xl font-bold text-amber-700 mb-4">Travel Tips</h3>
              <ul className="space-y-3">
                {post.tips.map((tip, index) => (
                  <li key={index} className="flex items-start">
                    <span className="flex-shrink-0 h-6 w-6 text-amber-500 mr-2 mt-0.5">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>

          {/* Author Bio */}
          <div className="border-t border-amber-100 p-6">
            <div className="flex items-center">
              <div className="bg-amber-100 rounded-full p-1 mr-4">
                <div className="bg-gradient-to-r from-amber-400 to-orange-500 w-12 h-12 rounded-full flex items-center justify-center text-white text-lg font-bold">
                  SL
                </div>
              </div>
              <div>
                <h4 className="text-lg font-bold text-gray-900">{post.author}</h4>
                <p className="text-amber-600">Travel Expert</p>
                <p className="text-gray-600 mt-2">With years of experience exploring every corner of Sri Lanka, {post.author.split(' ')[0]} shares insider tips and hidden gems to help you experience the best of the island.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Back to Blog Button */}
        <div className="mt-12 text-center">
          <button
            onClick={() => navigate('/blog')}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 transition-all"
          >
            <FaArrowLeft className="mr-2" />
            Back to All Articles
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogRead;
