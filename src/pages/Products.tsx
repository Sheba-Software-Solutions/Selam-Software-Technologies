import { ExternalLink, Star, Users, Download } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
const API_URL = import.meta.env.VITE_API_URL;

const Products = () => {
  const { productId } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const categories = ["All", "Enterprise", "Education", "Retail", "Healthcare", "Productivity", "FinTech"];

    useEffect(() => {
      const fetchProducts = async () => {
        try {
          const response = await fetch(`${API_URL}/api/v1/products`);
          if (!response.ok) throw new Error("Failed to fetch products");
          const data = await response.json();
          if (Array.isArray(data)) {
            setProducts(data);
          } else if (Array.isArray(data.products)) {
            setProducts(data.products);
          } else {
            setProducts([]);
          }
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchProducts();
    }, []);

  const selected = productId ? products.find(p => p.id === Number(productId)) : undefined;

  if (productId && !selected) {
    return (
      <div className="min-h-screen bg-brand-light flex items-center justify-center p-8">
        <div className="text-center space-y-6">
          <h1 className="text-3xl font-bold text-brand-dark">Product Not Found</h1>
          <p className="text-brand-dark/70 max-w-md mx-auto">We couldn't find the product you were looking for. It may have been removed or the URL is incorrect.</p>
          <Link to="/products">
            <Button className="bg-brand-dark hover:bg-brand-dark/90 text-brand-light">Back to Products</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (selected) {
    return (
      <div className="min-h-screen bg-brand-light">
        <section className="py-6 border-b border-brand-accent/20 bg-white/60 backdrop-blur">
          <div className="max-w-7xl mx-auto px-4 flex items-center gap-4">
            <Link to="/products">
              <Button variant="outline" size="sm" className="border-brand-accent text-brand-dark hover:bg-brand-accent hover:text-white">Back</Button>
            </Link>
            <div className="flex items-center gap-2 flex-wrap">
              <Badge className="bg-brand-accent text-white border-0">{selected.category}</Badge>
              <h1 className="text-2xl md:text-3xl font-bold text-brand-dark">{selected.name}</h1>
            </div>
          </div>
        </section>
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-5 gap-10">
            <div className="lg:col-span-3">
              <div className="overflow-hidden rounded-lg shadow-sm border border-brand-accent/20 bg-white mb-8">
                <img src={selected.image} alt={selected.name} className="w-full h-80 object-cover" />
              </div>
              <Card className="p-8 bg-white border-brand-accent/20 space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-2 text-brand-dark">Overview</h2>
                  <p className="text-brand-dark/80 leading-relaxed">{selected.description}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-brand-dark">Key Features</h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selected.features.map(f => (
                      <li key={f} className="text-sm bg-brand-accent/10 text-brand-dark px-3 py-2 rounded-md border border-brand-accent/20">{f}</li>
                    ))}
                  </ul>
                </div>
              </Card>
            </div>
            <div className="lg:col-span-2 space-y-6">
              <Card className="p-8 bg-white border-brand-accent/20 space-y-6">
                {selected.status === "Available" ? (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-brand-dark/70">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="font-medium">{selected.rating}</span>
                      <span className="text-brand-dark/50">/ 5.0</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-brand-dark/70">
                      <Users className="h-4 w-4" />
                      <span>{selected.users} users</span>
                    </div>
                  </div>
                ) : (
                  <Badge variant="secondary" className="bg-brand-accent/20 text-brand-dark border-0">{selected.status}</Badge>
                )}
                <div className="space-y-2">
                  <div className="text-sm uppercase tracking-wide text-brand-dark/60">Pricing</div>
                  <div className="text-2xl font-bold text-brand-accent">{selected.price}</div>
                </div>
                <div className="flex flex-col gap-3">
                  {selected.status === "Available" ? (
                    <>
                      <Button className="bg-brand-dark hover:bg-brand-dark/90 w-full">Request Demo</Button>
                      <Button variant="outline" className="border-brand-accent text-brand-dark hover:bg-brand-accent hover:text-white w-full">Get Started</Button>
                    </>
                  ) : (
                    <Button disabled variant="outline" className="border-brand-accent/50 text-brand-dark/50 w-full">Coming Soon</Button>
                  )}
                </div>
              </Card>
              <Card className="p-6 bg-white border-brand-accent/20">
                <h3 className="text-lg font-semibold mb-3 text-brand-dark">Need Customization?</h3>
                <p className="text-sm text-brand-dark/70 mb-4">We can tailor this product to your organization's specific workflows and needs. Reach out for a consultation.</p>
                <Link to="/contact">
                  <Button size="sm" className="bg-brand-accent hover:bg-brand-accent/90 text-white">Contact Us</Button>
                </Link>
              </Card>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-light">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-light to-brand-accent/20 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold text-brand-dark mb-6">
              Our <span className="bg-gradient-to-r from-brand-dark to-brand-accent bg-clip-text text-transparent">Products</span>
            </h1>
            <p className="text-xl text-brand-dark/80 max-w-3xl mx-auto">
              Discover our portfolio of innovative software solutions designed to streamline 
              operations and drive business growth across various industries.
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-brand-light border-b border-brand-accent/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <Button 
                key={category} 
                variant="outline" 
                className="border-brand-accent text-brand-dark hover:bg-brand-accent hover:text-brand-light transition-all duration-300"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20 bg-brand-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <Card 
                key={product.id} 
                className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-slide-in-from-left bg-white border-brand-accent/20"
                style={{ animationDelay: `${200 + index * 150}ms` }}
              >
                <div className="relative">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-brand-accent text-white border-0">
                      {product.category}
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge 
                      variant={product.status === "Available" ? "default" : "secondary"}
                      className={product.status === "Available" ? "bg-green-600 text-white border-0" : "bg-brand-accent/20 text-brand-dark border-0"}
                    >
                      {product.status}
                    </Badge>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-brand-dark mb-2">
                    {product.name}
                  </h3>
                  <p className="text-brand-dark/70 mb-4 text-sm">
                    {product.description}
                  </p>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex flex-wrap gap-2">
                      {product.features.map((feature) => (
                        <span 
                          key={feature} 
                          className="text-xs bg-brand-accent/10 text-brand-dark px-2 py-1 rounded-full border border-brand-accent/20"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                    
                    {product.status === "Available" && (
                      <div className="flex items-center justify-between text-sm text-brand-dark/70">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span>{product.rating}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          <span>{product.users} users</span>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-lg font-semibold text-brand-accent">
                      {product.price}
                    </div>
                    <div className="flex gap-2">
                      {product.status === "Available" ? (
                        <>
                          <Button size="sm" variant="outline" className="border-brand-accent text-brand-dark hover:bg-brand-accent hover:text-white">
                            <ExternalLink className="h-4 w-4 mr-1" />
                            Demo
                          </Button>
                          <Link to={`/products/${product.id}`}>
                            <Button size="sm" className="bg-brand-dark hover:bg-brand-dark/90 text-brand-light">
                              Get Started
                            </Button>
                          </Link>
                        </>
                      ) : (
                        <Button size="sm" variant="outline" disabled className="border-brand-accent/50 text-brand-dark/50">
                          Coming Soon
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Solutions Section */}
      <section className="py-20 bg-brand-accent/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">
              Need a Custom Solution?
            </h2>
            <p className="text-xl text-brand-dark/80 max-w-2xl mx-auto">
              Don't see what you're looking for? We specialize in creating custom software 
              solutions tailored to your specific business needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-8 text-center bg-white border-brand-accent/20">
              <div className="w-16 h-16 bg-brand-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-brand-accent" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-brand-dark">Consultation</h3>
              <p className="text-brand-dark/70">We understand your unique requirements</p>
            </Card>
            
            <Card className="p-8 text-center bg-white border-brand-accent/20">
              <div className="w-16 h-16 bg-brand-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-brand-accent" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-brand-dark">Custom Development</h3>
              <p className="text-brand-dark/70">Tailored solutions built from scratch</p>
            </Card>
            
            <Card className="p-8 text-center bg-white border-brand-accent/20">
              <div className="w-16 h-16 bg-brand-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Download className="h-8 w-8 text-brand-accent" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-brand-dark">Deployment & Support</h3>
              <p className="text-brand-dark/70">Full deployment and ongoing maintenance</p>
            </Card>
          </div>
          
          <div className="text-center mt-12">
            <Link to="/contact">
              <Button size="lg" className="bg-gradient-to-r from-brand-dark to-brand-accent hover:from-brand-dark/90 hover:to-brand-accent/90 text-brand-light">
                Request Custom Solution
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Products;
