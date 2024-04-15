<template>
  <el-pagination
    :pager-count="5"
    :disabled="disabled"
    :prev-icon="ArrowLeft"
    :next-icon="ArrowRight"
    :total="meta?.totalItems ?? 1"
    :page-size="meta?.itemsPerPage ?? 10"
    :current-page="meta?.currentPage ?? 1"
    @update:current-page="handleUpdate"
    layout="prev, pager, next"
  />
</template>

<script setup lang="ts">
import type { MetaData } from '@/types/global'
import ArrowRight from '@/components/icons/ArrowRight.vue'
import ArrowLeft from '@/components/icons/ArrowLeft.vue'

defineProps<{
  meta: MetaData | undefined
  disabled?: boolean
}>()
const emit = defineEmits(['update:current-page'])

const handleUpdate = (page: number) => {
  emit('update:current-page', page)
}
</script>
