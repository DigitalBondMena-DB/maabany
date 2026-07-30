import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { FloatingWireframeComponent } from '../../../../shared/components/floating-wireframe/floating-wireframe.component';
import { ImageComponent } from '../../../../shared/components/image/image.component';
import { SolutionCategory } from '../../models/solutions.intrface';


@Component({
  selector: 'app-solutions-grid',
  imports: [RouterLink, TranslatePipe, FloatingWireframeComponent, ImageComponent],
  templateUrl: './solutions-grid.component.html',
})
export class SolutionsGridComponent {
  readonly selectedCategory = signal<SolutionCategory | null>(null);

  readonly solutions: SolutionCategory[] = [
    {
      title: "Civil Solutions",
      slug: "civil-solutions",
      desc: "Delivering comprehensive civil construction services for residential, commercial, and industrial projects with a focus on quality, safety, and long-term durability.",
      image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1200&q=80",
      subcategories: [
        { title: "Commercial Buildings", slug: "commercial-buildings", desc: "State-of-the-art office towers, retail complexes, and commercial facilities.", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80" },
        { title: "Residential Buildings", slug: "residential-buildings", desc: "Luxury residential estates, modern multi-family complexes, and sustainable communities.", image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80" },
        { title: "Industrial Buildings & Warehouses", slug: "industrial-buildings-warehouses", desc: "Robotic gigafactories, logistics centers, and heavy-duty industrial warehouses.", image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80" },
        { title: "Prefabricated Steel Structures", slug: "prefabricated-steel-structures", desc: "High-precision pre-engineered and prefabricated steel frame systems.", image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80" }
      ]
    },
    {
      title: "Fit-Out Solutions",
      slug: "fit-out-solutions",
      desc: "Creating functional and premium interior spaces through complete fit-out solutions, from structural finishes to high-quality architectural detailing.",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
      subcategories: []
    },
    {
      title: "Infrastructure & Earthworks",
      slug: "infrastructure-earthworks",
      desc: "Delivering heavy earthmoving, site preparation, and deep underground utility networks to lay the robust groundwork for mega-projects and urban expansions.",
      image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80",
      subcategories: [
        { title: "Site Grading & Excavation", slug: "grading-excavation", desc: "Precision land clearing, deep excavation, and massive earthmoving.", image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80" },
        { title: "Underground Utilities", slug: "underground-utilities", desc: "Complete piping networks, water mains, and deep drainage systems.", image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80" },
        { title: "Roadworks & Paving", slug: "roadworks-paving", desc: "Heavy-duty asphalt paving, highway access roads, and infrastructure networks.", image: "https://images.unsplash.com/photo-1517649763962-0c623266010b?auto=format&fit=crop&w=800&q=80" }
      ]
    },
    {
      title: "MEP Solutions",
      slug: "mep-solutions",
      desc: "Providing integrated Mechanical, Electrical, and Plumbing (MEP) systems that ensure efficient, reliable, and sustainable building performance.",
      image: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=1200&q=80",
      subcategories: [
        { title: "Fire Fighting Systems", slug: "fire-fighting-systems", desc: "Active fire suppression, smart sprinklers, and early warning alarm networks.", image: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=800&q=80" },
        { title: "HVAC Systems", slug: "hvac-systems", desc: "High-performance heating, ventilation, and air conditioning systems.", image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80" },
        { title: "Plumbing", slug: "plumbing", desc: "Comprehensive plumbing engineering, water loops, and smart drainage.", image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80" }
      ]
    },
    {
      title: "Low Current Solutions",
      slug: "low-current-solutions",
      desc: "Delivering intelligent low-current systems including security, surveillance, networking, access control, parking management, and smart automation to create safer, smarter, and more connected buildings.",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
      subcategories: [
        { title: "CCTV Systems", slug: "cctv-systems", desc: "High-definition video surveillance and intelligent analytics for physical spaces.", image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80" },
        { title: "Data Network Solutions", slug: "data-network-solutions", desc: "Fast, secure, and robust enterprise networking backbones.", image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80" },
        { title: "Access Control Systems", slug: "access-control-systems", desc: "Comprehensive entry management featuring biometrics and RFID tracking.", image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80" },
        { title: "Parking Management Systems", slug: "parking-management-systems", desc: "Automated entry barriers, smart payment kiosks, and guidance lasers.", image: "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=800&q=80" },
        { title: "Smart Home Solutions", slug: "smart-home-solutions", desc: "Seamless smart home systems unifying climate, lighting, and audio.", image: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=800&q=80" }
      ]
    },
    {
      title: "Facility Management",
      slug: "facility-management",
      desc: "Providing comprehensive facility management services that maximize building performance through preventive maintenance, technical operations, and efficient asset management.",
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=80",
      subcategories: []
    }
  ];

  selectCategory(category: SolutionCategory): void {
    if (category.subcategories.length > 0) {
      this.selectedCategory.set(category);
      const element = document.getElementById('what-we-offer-grid-section');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

  clearSelection(): void {
    this.selectedCategory.set(null);
    const element = document.getElementById('what-we-offer-grid-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
