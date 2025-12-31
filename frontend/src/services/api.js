// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || '';

// Helper function to make API calls
async function apiCall(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    },
    ...options
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
}

// API Methods
export const api = {
  // Destinations
  getDestinations: () => apiCall('/api/destinations'),
  getDestination: (id) => apiCall(`/api/destinations/${id}`),
  getDestinationComplete: (id) => apiCall(`/api/destinations/${id}/complete`),
  
  // Flights
  getFlights: () => apiCall('/api/flights'),
  getFlightsByDestination: (destId) => apiCall(`/api/flights/destination/${destId}`),
  
  // Hotels
  getHotels: () => apiCall('/api/hotels'),
  getHotelsByDestination: (destId) => apiCall(`/api/hotels/destination/${destId}`),
  
  // Car Rentals
  getCarRentals: () => apiCall('/api/car-rentals'),
  getCarRentalsByDestination: (destId) => apiCall(`/api/car-rentals/destination/${destId}`),
  
  // Attractions
  getAttractions: () => apiCall('/api/attractions'),
  getAttractionsByDestination: (destId) => apiCall(`/api/attractions/destination/${destId}`),
  
  // Packages
  getPackages: () => apiCall('/api/packages'),
  getPackage: (id) => apiCall(`/api/packages/${id}`),
  
  // Search
  search: (query, filters) => apiCall('/api/search', {
    method: 'POST',
    body: JSON.stringify({ query, filters })
  }),
  
  // Trips
  createTrip: (tripData) => apiCall('/api/trips', {
    method: 'POST',
    body: JSON.stringify(tripData)
  }),
  getTrip: (id) => apiCall(`/api/trips/${id}`),
};

export default api;

