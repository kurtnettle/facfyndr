import {
	Academia,
	Clarivate,
	GoogleScholar,
	IEEEXplore,
	LinkedIn,
	OrcId,
	ResearchGate,
	Scopus
} from '$lib/components/custom/icons';
import type { LogoConfig, SocialPlatform } from './academic-profile-types';

export function getPlatformFromHostname(host: string): SocialPlatform | null {
	console.debug(host);
	if (host.includes('academia')) return 'academia';
	if (host.includes('clarivate') || host.includes('webofscience')) return 'clarivate';
	if (host.includes('ieee')) return 'ieee';
	if (host.includes('linkedin')) return 'linkedin';
	if (host.includes('orcid')) return 'orcid';
	if (host.includes('researchgate')) return 'researchgate';
	if (host.includes('scholar')) return 'scholar';
	if (host.includes('scopus')) return 'scopus';
	return null;
}

export const logos: Record<SocialPlatform, LogoConfig> = {
	academia: { color: '#41454A', logo: Academia, ariaLabel: 'Academia.edu' },
	clarivate: { color: '#', logo: Clarivate, ariaLabel: 'Web of Science' },
	ieee: { color: '#00629B', logo: IEEEXplore, ariaLabel: 'IEEE Xplore' },
	linkedin: { color: '#0A66C2', logo: LinkedIn, ariaLabel: 'LinkedIn' },
	orcid: { color: '#A6CE39', logo: OrcId, ariaLabel: 'ORCID' },
	researchgate: { color: '#00CCBB', logo: ResearchGate, ariaLabel: 'ResearchGate' },
	scholar: { color: '#4285F4', logo: GoogleScholar, ariaLabel: 'Google Scholar' },
	scopus: { color: '#E9710E', logo: Scopus, ariaLabel: 'Scopus' }
};
