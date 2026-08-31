import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Description Examples by Property Type | HostCopy AI",
  description: "See example Airbnb, Booking.com, and Instagram listing copy for a beach apartment, mountain cabin, city studio, and family house.",
  alternates: { canonical: "https://hostcopyai.com/examples-by-property-type" },
  openGraph: {
    title: "Listing Description Examples by Property Type",
    description: "Example Airbnb, Booking.com, and Instagram copy for four common property types — see the difference in how each platform is written.",
    url: "https://hostcopyai.com/examples-by-property-type",
    siteName: "HostCopy AI",
    type: "website",
  },
};

type Example = {
  key: string;
  label: string;
  subtitle: string;
  airbnb: string;
  booking: string;
  instagram: string;
};

const EXAMPLES: Example[] = [
  {
    key: "beach-apartment",
    label: "Beach apartment",
    subtitle: "2BR beach apartment · Algarve coast, Portugal",
    airbnb:
      "Fall asleep to the sound of waves and wake up two minutes from the sand. This bright 2-bedroom apartment sits right on the Algarve coast, with a private balcony that catches the sunset over the water every evening. The open kitchen and living area flow onto that balcony, so mornings start with coffee and a sea view rather than four walls. A short stroll gets you to the harbor's fish restaurants and the main beach access point. The pool downstairs is ideal for the hours between beach trips, and fast WiFi means remote workdays are just as easy as lazy ones. Great for couples chasing a slow coastal week or small families who want the beach at their doorstep without the resort price tag.",
    booking:
      "Beachfront-adjacent 2-bedroom apartment on the Algarve coast, 2 minutes' walk from the main beach. Private balcony with sea view, shared pool, fully equipped kitchen, and air conditioning throughout. Sleeps 4. Harbor restaurants and beach access within a 5-minute walk. Fast WiFi suitable for remote work. Ideal for couples and small families seeking a coastal base for day trips along the Algarve.",
    instagram:
      "Beach mornings, balcony sunsets 🌊🌅 Two minutes from the sand on the Algarve coast. #beachapartment #algarve #coastalliving #vacationrental",
  },
  {
    key: "mountain-cabin",
    label: "Mountain cabin",
    subtitle: "3BR mountain cabin · Rocky Mountains foothills",
    airbnb:
      "Come in from the cold to a crackling fireplace and floor-to-ceiling windows framing the pine trees outside. This 3-bedroom cabin sits at the edge of a quiet forest trailhead, ten minutes' drive from the ski lifts and half that from the nearest hiking loop. The open living area centers on a wood-burning fireplace, and the hot tub on the back deck is made for evenings after a day on the slopes or trails. A full kitchen and large dining table mean the whole group can cook and eat together instead of splitting up for meals. Free parking for two cars right outside the door. Perfect for a ski trip with friends or a summer week of hiking and doing absolutely nothing in between.",
    booking:
      "3-bedroom mountain cabin near ski lifts and hiking trails, 10-minute drive to the resort. Wood-burning fireplace, private outdoor hot tub, full kitchen, free parking for 2 vehicles. Sleeps 6-8. Quiet forest setting with trailhead access on foot. Suited to ski groups, hiking parties, and multi-generation family trips.",
    instagram:
      "Fireplace nights, hot tub views 🏔️🔥 Steps from the trailhead, minutes from the lifts. #mountaincabin #cabinlife #skitrip",
  },
  {
    key: "city-studio",
    label: "City studio",
    subtitle: "Studio apartment · Downtown, walkable city center",
    airbnb:
      "A clean, quiet studio built for getting things done and then stepping straight out the door. The space is compact but never cramped — a proper desk by the window, fast WiFi, and a kitchenette stocked with the basics for a quick breakfast before meetings. You're an eight-minute walk from the main transit hub and surrounded by coffee shops, so mornings don't require a car or a long commute. In the evenings, the neighborhood's restaurants and a nearby park make it easy to unwind without planning ahead. Best suited to solo travelers, remote workers on a short-term stay, or anyone who wants a functional base in the middle of the city.",
    booking:
      "Downtown studio apartment, 8-minute walk to the main transit hub. Dedicated workspace with high-speed WiFi, kitchenette, air conditioning. Sleeps 1-2. Restaurants, cafés, and a public park within walking distance. Well suited to business travelers and remote workers needing a central, functional base.",
    instagram:
      "Small space, big city 🏙️💻 Central, quiet, and built for getting things done. #citystudio #remotework #downtownliving",
  },
  {
    key: "family-house",
    label: "Family house",
    subtitle: "4BR family house · Suburban neighborhood, 15 min from downtown",
    airbnb:
      "Plenty of room to spread out, and a backyard the kids won't want to leave. This 4-bedroom house sits on a quiet residential street, fifteen minutes from downtown but a world away from it — think tree-lined sidewalks, a fenced backyard, and neighbors out walking their dogs in the evening. Inside, the kitchen opens onto a dining area big enough for the whole group, and the living room has enough seating that nobody's stuck on the floor. Air conditioning keeps things comfortable in summer, and free driveway parking means no circling the block with a car full of luggage. Pets are welcome, so the family dog doesn't have to sit this trip out. A genuinely easy base for a family reunion or a multi-family vacation.",
    booking:
      "4-bedroom house in a quiet suburban neighborhood, 15 minutes from downtown by car. Fenced backyard, full kitchen, air conditioning, free driveway parking for 2 cars. Pet-friendly. Sleeps 8. Suited to family groups, reunions, and multi-family bookings needing more space than a downtown apartment offers.",
    instagram:
      "Backyard days, big-table dinners 🏡🐾 Room for the whole family (pets included). #familytravel #petfriendly #vacationhome",
  },
];

export default function ExamplesByPropertyTypePage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-6 py-16">
        <Link href="/" className="text-sm text-navy/70 hover:text-navy transition-colors">
          &larr; Back to HostCopy AI
        </Link>
        <h1 className="font-display text-3xl md:text-4xl font-semibold text-navy mt-6 mb-4">
          Description Examples by Property Type
        </h1>
        <p className="text-navy/70 leading-relaxed mb-2">
          Four example property types, each with the three versions HostCopy AI writes from one form: an Airbnb description, a Booking.com description, and an Instagram caption.
        </p>
        <p className="text-sm text-navy/60 italic mb-10">
          These are static example outputs for illustration, not live-generated on this page — try the real generator on the homepage for your own property.
        </p>

        <div className="space-y-12">
          {EXAMPLES.map((example) => (
            <section key={example.key} className="bg-parchment rounded-2xl border border-navy/15 shadow-card p-6 md:p-8">
              <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
                <h2 className="font-display text-xl font-semibold text-navy">{example.label}</h2>
                <span className="font-mono text-xs uppercase tracking-wide text-navy/50">{example.subtitle}</span>
              </div>

              <div className="space-y-5">
                <div>
                  <p className="font-mono text-xs uppercase tracking-wide text-teal mb-1.5">Airbnb &middot; example output</p>
                  <p className="text-ink leading-relaxed whitespace-pre-wrap">{example.airbnb}</p>
                </div>
                <div className="pt-4 border-t border-navy/10">
                  <p className="font-mono text-xs uppercase tracking-wide text-teal mb-1.5">Booking.com &middot; example output</p>
                  <p className="text-ink leading-relaxed whitespace-pre-wrap">{example.booking}</p>
                </div>
                <div className="pt-4 border-t border-navy/10">
                  <p className="font-mono text-xs uppercase tracking-wide text-teal mb-1.5">Instagram &middot; example output</p>
                  <p className="text-ink leading-relaxed whitespace-pre-wrap">{example.instagram}</p>
                </div>
              </div>
            </section>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-navy/10 text-center">
          <Link
            href="/#generator-form"
            className="inline-block bg-brass text-navy rounded-lg px-6 py-3 font-medium hover:bg-brass-dark transition-colors"
          >
            Generate your own for free
          </Link>
          <p className="text-xs text-navy/60 mt-3">3 free generations, no signup required.</p>
        </div>
      </div>
    </main>
  );
}
