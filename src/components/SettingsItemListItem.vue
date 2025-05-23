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

  // Pinia stores
  import { useStWindow } from '@/stores/stWindow.js'
  import { useStAuth } from '@/stores/stAuth.js'
  import { useStUser } from '@/stores/stUser.js'

  // init stores
  const stWindow = useStWindow()
  const stAuth = useStAuth()
  const stUser = useStUser()
  
  const router = useRouter()

  const emit = defineEmits(['updateIsBeingEdited'])

  const props = defineProps({
    item: {
      type: Object,
      required: true,
    },
    stType: {
      type: String,
      required: true,
    }
  })

  const itemName = ref(props.item.name)

  const isBeingEdited = ref(false)

  const cancelEditItem = () => {
    isBeingEdited.value = false
    itemName.value = props.item.name
  }

  const sendValueToParent = () => {
    // Emetem l'esdeveniment 'updateValue' amb el valor de l'input
    emit('updateIsBeingEdited', isBeingEdited.value);
  }

  const editItemInListItem = () => {
    isBeingEdited.value = !isBeingEdited.value
    sendValueToParent()
  }
</script>

<template>
  <div class="sd-settings-item__elements-list-item"
    :class="{ 'sd-settings-item__elements-list-item--editing': isBeingEdited }">
    <!-- button to delete item -->
    <div class="sd-settings-item__bttn" 
      v-if="!item.locked"
      @click="stUser.delItem(item.id, stType)">
      <SVGCircleCross
        :cssFill="['alert']"
        :cssStroke="['alert']"/>
    </div>

    <div class="sd-settings-item__bttn" 
      v-else
      @click="stUser.delItem(item.id, stType)">
      <SVGCircleCross :cssStroke="['unselected']"/>
    </div>

    <!-- item name not being edited -->
    <div class="sd-settings-item__name"
    v-if="!isBeingEdited">
      {{ item.name }}
    </div>

    <!-- item name being edited -->
    <input class="sd-input"
      v-if="isBeingEdited"
      autocomplete="on"
      v-model="itemName"
      type="text" 
      :maxlength="35"
      :placeholder="`${item.name}`">

    <!-- button to set item as default -->
    <div class="sd-settings-item__bttn"
      v-if="!isBeingEdited"
      @click="stUser.setDefaultItem(item.id, stType)">
      <SVGCircleButton 
        v-if="item.isDefault"
        :cssFill="['link']" 
        :cssStroke="['unselected']"/>
      <SVGCircleButton v-else
        :cssFill="['unselected']"
        :cssStroke="['unselected']"/>
    </div>

    <ButtonIcon v-if="!isBeingEdited"
      :bttnAction="editItemInListItem" 
      :bttnColor="'none'">
      <template #bttIconSlot>
        <SVGWrite :cssStroke="['warning']"/>
      </template>
    </ButtonIcon>

    <ButtonComp v-if="isBeingEdited"
      :bttnAction="cancelEditItem" 
      :bttnType="'action'"
      :bttnTxt="`cancel`"
      :bttnColor="'alert'">
    </ButtonComp>
  </div>

  <div class="sd-settings-item__elements-list-item--edit-nav"
    v-if="isBeingEdited">
    <ButtonComp @click="isBeingEdited = false"
      :bttnAction="stUser.updateItem"
      :bttnPayload="[item.id, stType, {name: itemName}]"
      :bttnType="'action'"
      :bttnTxt="`update`"
      :bttnDisabled="itemName === item.name"
      :bttnColor="'accept'">
    </ButtonComp>
  </div>
</template>

<style lang="scss">
  .sd-input {
    &--edit {
      width: 100%;;
    }
  }

  .tesssst {
    width: 100%;
  }
</style>