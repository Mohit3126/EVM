import { FaUserCircle } from 'react-icons/fa';
import { FiLogIn, FiUserPlus } from 'react-icons/fi';

const features = [
  {
    title: 'Secure & Transparent',
    desc: 'Your vote is encrypted and verifiable, ensuring trust in every election.'
  },
  {
    title: 'Easy to Use',
    desc: 'A simple, intuitive interface for all voters, on any device.'
  },
  {
    title: 'Real-Time Results',
    desc: 'Get instant updates and live results as votes are counted.'
  }
];

const howItWorks = [
  {
    title: 'Register',
    desc: 'Sign up with your verified identity to access the platform.',
    icon:  <FiUserPlus className="text-3xl text-indigo-600 mb-2" />, //FiUserPlus
  },
  {
    title: 'Vote',
    desc: 'Cast your vote securely and anonymously from any device.',
    icon: <FaUserCircle className="text-3xl text-indigo-600 mb-2" />,
  },
  {
    title: 'Track',
    desc: 'Track your vote and see real-time results instantly.',
    icon: <FiLogIn className="text-3xl text-indigo-600 mb-2" />,
  },
];

const testimonials = [
  {
    name: 'Ayesha K.',
    text: 'Voting online was so easy and secure! I loved the transparency and instant results.',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    name: 'Rahul S.',
    text: 'The platform is intuitive and works perfectly on my phone. Highly recommended!',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    name: 'Fatima Z.',
    text: 'I felt confident that my vote was counted and protected. Great experience!',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
  },
];

export {testimonials ,features , howItWorks}