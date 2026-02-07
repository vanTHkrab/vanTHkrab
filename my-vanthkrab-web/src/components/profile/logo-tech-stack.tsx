import LogoLoop from '@/components/LogoLoop';
import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiRadixui,

  SiNodedotjs,
  SiNestjs,
  SiPhp,
  SiLaravel,
  SiPostman,
  SiGraphql,

  SiMysql,
  SiPostgresql,
  SiMongodb,

  SiDocker,
  SiGithub,
  SiGithubactions,
  SiLinux,
  SiCloudflare,


  SiSupabase,
  SiFirebase,
} from "react-icons/si";

const techLogos = [
  // Frontend
  { node: <SiHtml5 />, title: "HTML", href: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
  { node: <SiCss3 />, title: "CSS", href: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
  { node: <SiJavascript />, title: "JavaScript", href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
  { node: <SiTypescript />, title: "TypeScript", href: "https://www.typescriptlang.org" },
  { node: <SiReact />, title: "React", href: "https://react.dev" },
  { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" },
  { node: <SiTailwindcss />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
  { node: <SiRadixui />, title: "shadcn/ui", href: "https://ui.shadcn.com" },

  // Backend
  { node: <SiNodedotjs />, title: "Node.js", href: "https://nodejs.org" },
  { node: <SiNestjs />, title: "NestJS", href: "https://nestjs.com" },
  { node: <SiPhp />, title: "PHP", href: "https://www.php.net" },
  { node: <SiLaravel />, title: "Laravel", href: "https://laravel.com" },
  { node: <SiPostman />, title: "RESTful API", href: "https://restfulapi.net" },
  { node: <SiGraphql />, title: "GraphQL", href: "https://graphql.org" },
  // { node: <SiGrpc />, title: "gRPC", href: "https://grpc.io" },
  { node: <SiDocker />, title: "Microservices", href: "https://microservices.io" },

  // Database
  { node: <SiMysql />, title: "MySQL", href: "https://www.mysql.com" },
  { node: <SiPostgresql />, title: "PostgreSQL", href: "https://www.postgresql.org" },
  { node: <SiMongodb />, title: "MongoDB", href: "https://www.mongodb.com" },

  // Infrastructure
  { node: <SiDocker />, title: "Docker", href: "https://www.docker.com" },
  { node: <SiGithub />, title: "GitHub", href: "https://github.com" },
  { node: <SiGithubactions />, title: "CI/CD", href: "https://github.com/features/actions" },
  { node: <SiLinux />, title: "Linux Server", href: "https://www.linux.org" },
  { node: <SiCloudflare />, title: "Cloudflare", href: "https://www.cloudflare.com" },

  // Cloud
  // { node: <SiAmazonaws />, title: "AWS", href: "https://aws.amazon.com" },
  { node: <SiSupabase />, title: "Supabase", href: "https://supabase.com" },
  { node: <SiFirebase />, title: "Firebase", href: "https://firebase.google.com" },
];


function LogoTechStack() {
    return (
        <LogoLoop
          logos={techLogos}
          speed={100}
          direction="left"
          logoHeight={60}
          gap={120}
          hoverSpeed={0}
          ariaLabel="Technology partners"
      />
    );
}

export default LogoTechStack;