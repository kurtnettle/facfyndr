<script lang="ts">
	import { FacultyCardContainer, FacultyCardContent } from '.';

	let { facultyName, departments } = $props();
</script>

<FacultyCardContainer>
	<FacultyCardContent {facultyName} {departments} />
</FacultyCardContainer>
