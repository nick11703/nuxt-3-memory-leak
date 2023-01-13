<template>
    <div>
        <h1>Test</h1>
        <pre>
            {{ data }}
        </pre>
    </div>
</template>

<script setup lang="ts">
const { data } = useLazyFetch('/api/data')
</script>