<script setup>
  import { 
    computed,
    onMounted,
    ref, 
  } from 'vue'

  import { useRouter, RouterLink } from 'vue-router'
  import { useTitle } from '@vueuse/core'

  import { v4 as uuidv4 } from 'uuid'

  // helpers
  import { standarizeWidthFromRef } from '@/assets/helpers.js'

  import MarkSchizoo from '@/components/SVGs/MarkSchizoo.vue'
  import ButtonComp from '@/components/buttons/ButtonComp.vue'
  import ButtonIcon from '@/components/buttons/ButtonIcon.vue'
  import TextBlock from '@/components/TextBlock.vue'
  import SVGArrowClose from '@/components/SVGs/SVGArrowClose.vue'
  import SVGArrowOpen from '@/components/SVGs/SVGArrowOpen.vue'
  import SVGCircleCross from '@/components/SVGs/SVGCircleCross.vue'
  import SVGCircleCheck from '@/components/SVGs/SVGCircleCheck.vue'
  import SVGPageBlueprint from '@/components/SVGs/SVGPageBlueprint.vue'
  import SVGCircleButton from '@/components/SVGs/SVGCircleButton.vue'
  import SVGWrite from '@/components/SVGs/SVGWrite.vue'
  import SettingsItemListItem from '@/components/SettingsItemListItem.vue'

  // Pinia stores
  import { useStWindow } from '@/stores/stWindow.js'
  import { useStAuth } from '@/stores/stAuth.js'
  import { useStUser } from '@/stores/stUser.js'

  // init stores
  const stWindow = useStWindow()
  const stAuth = useStAuth()
  const stUser = useStUser()
  
  const router = useRouter()

  const props = defineProps({
    stType: {
      type: String,
      required: true,
    },
    limit: {
      type: Number,
      default: 5
    }
  })

//   const filterTxt = ref(null)

//   const isBeingEdited = ref(false)
//   const isExpanded = ref(false)

//   const newItem = computed(() => {
//     switch (props.stType) {
//       case 'accounts':
//         return 'newAccount'
//       case 'categories':
//         return 'newCategory'
//       case 'tags':
//         return 'newTag'
//     }
//   })

//   const typeSingleName = computed(() => {
//     switch (props.stType) {
//       case 'accounts':
//         return 'account'
//       case 'categories':
//         return 'category'
//       case 'tags':
//         return 'tag'
//       default: 'item'
//     }
//   })

//   const titleTxt = computed(() => {
//     return props.stType + `[${stUser[props.stType].length}/${props.limit}]`
//   })

//   const sortedItems = (items) => {
//     // return filterTxt.sort((a, b) => b.name.localeCompare(a.name))
//     return items.sort((a, b) => b.dateCreated - a.dateCreated)
//   }

//   const filteredItems = computed(() => {
//     let items = stUser[props.stType]
//     if (!filterTxt.value) return sortedItems(items).slice(0, 5)

//     let filtered = items.filter(item => {
//       return item.name.toLowerCase().includes(filterTxt.value.toLowerCase())
//     })

//     return sortedItems(filtered).slice(0, 5)
//   })

//   const itemIsBeingEdited = (tf) => {
//     isBeingEdited.value = tf
//   }
</script>

// <template>
//   <div class="sd-settings-list">
//     <div class="sd-settings-list__header">
//       <TextBlock 
//         :deco="false" 
//         :text="titleTxt" 
//         :type="isExpanded ? `item-title` : 'item-title-back'" />

//       <ButtonIcon 
//         :bttnAction="() => { isExpanded = !isExpanded }" 
//         :bttnColor="'lightest-001'">
//         <template #bttIconSlot>
//           <SVGArrowClose v-if="isExpanded" />
//           <SVGArrowOpen v-else />
//         </template>
//       </ButtonIcon>
//     </div>

//     <div v-if="isExpanded">
//       <div class="sd-settings-item" 
//         v-if="stUser[stType].length == 0">
//         <TextBlock :text="'no items'" :type="'desc'" />
//       </div>
  
//       <div class="sd-settings-item" 
//         v-else>
//         <div v-if="stUser[props.stType].length > 4">
//           <input class="sd-input"
//             autocomplete="on"
//             v-model="filterTxt"
//             type="text" 
//             :maxlength="35"
//             :placeholder="`type something to filter`">
//         </div>

//         <div class="sd-settings-item__elements-list"
//           :class="{ 'sd-settings-item__elements-list--editing': isBeingEdited }">
//           <SettingsItemListItem @updateIsBeingEdited="itemIsBeingEdited"
//             v-for="(item, iItem) in filteredItems"
//             :item="item" :stType="stType" />
//         </div>
//       </div>

//       <div v-if="(stUser[stType].length < limit) || !isBeingEdited">
//         <input class="sd-input"
//           autocomplete="on"
//           v-model="stUser[newItem].name"
//           type="text" 
//           :maxlength="35"
//           :placeholder="`type ${typeSingleName} name`">

//         <ButtonComp 
//           :bttnAction="stUser.addItem"
//           :bttnType="'action'"
//           :bttnPayload="[ stType, newItem ]"
//           :bttnTxt="`add ${typeSingleName}`"
//           :bttnColor="'accept'">
//         </ButtonComp>
//       </div>
//     </div>
//   </div>
// </template>

// <style lang="scss">
// </style>