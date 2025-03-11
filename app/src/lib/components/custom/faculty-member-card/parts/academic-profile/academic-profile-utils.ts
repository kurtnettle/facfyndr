import { GoogleScholar, LinkedIn, OrcId, ResearchGate } from '$lib/components/custom/icons';
import type { LogoConfig, SocialPlatform } from './academic-profile-types';

export function getPlatformFromHostname(host: string): SocialPlatform | null {
	if (host.includes('linkedin')) return 'linkedin';
	if (host.includes('researchgate')) return 'researchgate';
	if (host.includes('orcid')) return 'orcid';
	if (host.includes('scholar')) return 'scholar';
	return null;
}

export const logos: Record<SocialPlatform, LogoConfig> = {
	linkedin: { color: '#0A66C2', logo: LinkedIn, ariaLabel: 'LinkedIn' },
	researchgate: { color: '#00CCBB', logo: ResearchGate, ariaLabel: 'ResearchGate' },
	orcid: { color: '#A6CE39', logo: OrcId, ariaLabel: 'ORCID' },
	scholar: { color: '#4285F4', logo: GoogleScholar, ariaLabel: 'Google Scholar' }
};
