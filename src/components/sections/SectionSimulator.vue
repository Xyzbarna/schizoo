<script setup>
  import { 
    computed,
    nextTick,
    onBeforeMount, 
    onBeforeUpdate,
    onBeforeUnmount, 
    onMounted,
    onUpdated,
    onUnmounted,
    ref, 
    reactive, 
    watch,
  } from 'vue'

  import { useRouter, RouterLink } from 'vue-router'
  import { useTitle } from '@vueuse/core'

  import markdownit from 'markdown-it'

  // helpers
  import { standarizeWidthFromRef } from '@/assets/helpers.js'

  import MarkSchizoo from '@/components/SVGs/MarkSchizoo.vue'
  import ButtonComp from '@/components/buttons/ButtonComp.vue'
  import ButtonIcon from '@/components/buttons/ButtonIcon.vue'
  import SectionFormAuth from '@/components/sections/SectionFormAuth.vue'
  import SectionMenuFull from '@/components/sections/SectionMenuFull.vue'
  import SWB from '@/components/SWB.vue'
  import TextBlock from '@/components/TextBlock.vue'


  // Pinia stores
  import { useStWindow } from '@/stores/stWindow.js'
  import { useStAuth } from '@/stores/stAuth.js'
  import { useStUser } from '@/stores/stUser.js'

  const router = useRouter()

  // init stores
  const stWindow = useStWindow()
  const stAuth = useStAuth()
  const stUser = useStUser()
  useTitle(`schizoo.com // HOME`)

  const md = markdownit({
    html: true,
    linkify: true,
    typographer: true,
    breaks: true,
  })

  const txtMd = computed(() => {
    return md.render(warningTxt)
  })

  const itemsFake = ref([
    {
      floor: '1A',
      door: '03',
      letter: 'B',
      itemType: 'house', // house, garage, storage
      name: 'Residencial Vista Alegre',
      itemUrl: '#',
      devUrl: '#',
      taxType: 'VAT',
      cost: 250000,
      exclude: false
    },
    {
      floor: 'PB',
      door: '07',
      letter: null, // Letter explicitly set to null
      itemType: 'garage', // house, garage, storage
      name: 'Garatge Subterrani Centre',
      itemUrl: '#',
      devUrl: '#',
      taxType: 'VAT',
      cost: 30000,
      exclude: false
    },
    {
      floor: '2B',
      door: '12',
      letter: 'C',
      itemType: 'storage', // house, garage, storage
      name: 'Magatzem Sant Jordi',
      itemUrl: '#',
      devUrl: '#',
      taxType: 'VAT',
      cost: 15000,
      exclude: false
    },
    {
      floor: '3C',
      door: '15',
      letter: null, // Letter explicitly set to null
      itemType: 'house', // house, garage, storage
      name: 'Apartaments de la Platja',
      itemUrl: '#',
      devUrl: '#',
      taxType: 'VAT',
      cost: 320000,
      exclude: false
    },
    {
      floor: 'PB',
      door: '02',
      letter: 'A',
      itemType: 'garage', // house, garage, storage
      name: 'Parking Residencial Nord',
      itemUrl: '#',
      devUrl: '#',
      taxType: 'VAT',
      cost: 25000,
      exclude: false
    }
  ])

  const warningTxt = `El **simulador** actualment està limitat a un habitatge més tres amenities combinades de la següent manera: màxim 2 poden ser garatges i 2 poden ser trasters.
  Si us plau modifica la teva selecció [ * ] per continuar.`

  const totalVATvalue = computed(() => {
    let total = 0

    itemsFake.value.forEach(item => {
      if (!item.exclude) {
        total += tax(item.taxType, item.cost)
      }
    })
    return total
  })

  const blockSim = computed(() => {
    let houses = 0
    let parkings = 0
    let storages = 0

    for (let i = 0; itemsFake.value.length > i; i++) {
      if (!itemsFake.value[i].exclude && itemsFake.value[i].itemType === 'house') houses++
      if (!itemsFake.value[i].exclude && itemsFake.value[i].itemType === 'garage') parkings++
      if (!itemsFake.value[i].exclude && itemsFake.value[i].itemType === 'storage') storages++


      if (houses > 1 || parkings > 2 || storages > 2) break
    }

    if (houses > 1 || !houses || parkings > 2 || storages > 2) return true

    return false
  })


  const totalValue = () => {
    let total = 0

    itemsFake.value.forEach(item => {
      console.log(total, stUser.mortageSimValues.total)
      if (!item.exclude) {
        total += item.cost
      }
    })

    stUser.mortageSimValues.total = total

    console.log(total, stUser.mortageSimValues.total)
  }


  const reversePercentage = (total, per) => total / (1 + per)

  const res = computed(() => {
    return stUser.simResults
  })

  const buyTitleCosts = computed(() => {
    let AJD = res.value.packValue * stUser.mortageSimValues.AJD.buy
    let notary = res.value.packValue * stUser.mortageSimValues.notary.buy
    let registry = res.value.packValue * stUser.mortageSimValues.registry
    let accountant = stUser.mortageSimValues.accountant
    let VAT = ((AJD + notary + registry) * 0.21).toFixed(2)

    return {
      AJD,
      notary,
      registry,
      accountant,
      VAT
    }
  })

  const mortageTitleCost = computed(() => {
    let AJD = res.value.packValue * stUser.mortageSimValues.AJD.mortage
    let notary = res.value.packValue * stUser.mortageSimValues.notary.mortage
    let registry = res.value.packValue * stUser.mortageSimValues.registry
    let accountant = stUser.mortageSimValues.accountant
    let VAT = ((AJD + notary + registry) * 0.21).toFixed(2)

    return {
      AJD,
      notary,
      registry,
      accountant,
      VAT
    }
  })

  const tax = (taxType, val) => {
    if (taxType === 'VAT') return val * 0.1
    return 0
  }

  const toggleItem = (index) => {
    itemsFake.value[index].exclude = !itemsFake.value[index].exclude
    totalValue()
  }

  onMounted(() => {
    totalValue()
  })
</script>

<template>
  <main class="sd-view">
    <section class="sd-section"> 
      <header class="sd-section__header">
        <h1 class="sd-h1">Simulador d'hipoteca</h1>
      </header>

      <div class="sd-section__cont">
        <div class="sd-section__cont-bg">
          <div class="sd-section__block">
            <div class="sd-sim-project-item-list-header">
              <div class="sd-sim-project-item-list-header__cell">
                Ref
              </div>

              <div class="sd-sim-project-item-list-header__cell">
                Projecte
              </div>

              <div class="sd-sim-project-item-list-header__cell">
                Cost /€
              </div>

              <div class="sd-sim-project-item-list-header__cell">
              </div>
            </div>

            <div class="sd-sim-project-item-list">
              <div class="sd-sim-project-item" v-for="(item, index) in itemsFake">
                <router-link class="sd-sim-project-item__cell sd-sim-project-item__cell--ref"
                  :to="item.itemUrl">
                  <div class="sd-sim-project-item__cell-item">
                    <span v-if="item.floor">{{ item.floor }}</span>
                    <span v-if="item.door">-</span>                    
                    <span v-if="item.door">{{ item.door }}</span>
                    <span v-if="item.letter">/</span>
                    <span v-if="item.letter">{{ item.letter }}</span>
                  </div>
                  <div class="sd-sim-project-item__cell-item sd-sim-project-item__cell-item--flag"
                    v-if="item.itemType !== 'house'">
                    {{ item.itemType }}
                  </div>
                </router-link>

                <router-link class="sd-sim-project-item__cell sd-sim-project-item__cell--name"
                  :to="item.devUrl">
                  <div>
                    {{ item.name }}
                  </div>
                </router-link>

                <div class="sd-sim-project-item__cell sd-sim-project-item__cell--cost">
                  <div class="sd-sim-project-item__cell-item sd-sim-project-item__cell-item--val">
                    <div class="sd-sim-project-item__cell-item-particle sd-sim-project-item__cell-item-particle--val">
                      {{ item.cost.toLocaleString('de-DE') }}
                    </div>
                  </div>

                  <div class="sd-sim-project-item__cell-item sd-sim-project-item__cell-item--tax">
                    <div class="sd-sim-project-item__cell-item-particle sd-sim-project-item__cell-item-particle--tax-txt">
                      {{ item.taxType }}
                    </div>

                    <div class="sd-sim-project-item__cell-item-particle sd-sim-project-item__cell-item-particle--tax-val">
                      {{ tax(item.taxType, item.cost).toLocaleString('de-DE') }}
                    </div>
                  </div>
                </div>

                <div class="sd-sim-project-item__cell sd-sim-project-item__cell--button">
                  <div class="sd-button-icon"
                    :class="item.exclude ? 'sd-button-icon--unactive-a' : 'sd-button-icon--active-a'"
                    @click="toggleItem(index)">
                    <span class="sd-button-icon__deco">
                      [
                    </span>

                    <span class="sd-button-icon__char">
                      *
                    </span>

                    <span class="sd-button-icon__deco">
                      ]
                    </span>

                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="sd-section__block" v-if="blockSim">
            <div class="sd-txt-msg" v-html="txtMd"></div>
          </div>

          <div class="sd-section__block" v-if="!blockSim">
            <div class="sd-sim-project-total">
              <div class="sd-sim-project-total__desc">
                subtotal
              </div>

              <div class="sd-sim-project-total__val">
                {{ stUser.mortageSimValues.total.toLocaleString('de-DE') }}
              </div>
            </div>

            <div class="sd-sim-project-total">
              <div class="sd-sim-project-total__desc">
                VAT
              </div>

              <div class="sd-sim-project-total__val">
                {{ totalVATvalue.toLocaleString('de-DE') }}
              </div>
            </div>

            <div class="sd-sim-project-total">
              <div class="sd-sim-project-total__desc sd-sim-project-total__desc--total">
                total
              </div>

              <div class="sd-sim-project-total__val sd-sim-project-total__val--total">
                {{ (totalVATvalue + stUser.mortageSimValues.total).toLocaleString('de-DE') }}
              </div>
            </div>
          </div>

          <div class="sd-section__block">
            <div class="sd-sim-project-block-title">
              Variables
            </div>

            <div class="sd-sim-project-input-list">
              <div class="sd-sim-project-input-item">
                <div class="sd-sim-input-item__particle sd-sim-input-item__particle--name">
                  interès
                </div>

                <div class="sd-sim-input-item__particle sd-sim-input-item__particle--rate">
                  <div class="sd-input-bg">
                    <input class="sd-input"
                      placeholder="int"
                      v-model="stUser.mortageSimValues.intRate"
                      @update:modelValue="totalValue"
                      type="number" />
                  </div>
                </div>
              </div>

              <div class="sd-sim-project-input-item">
                <div class="sd-sim-input-item__particle sd-sim-input-item__particle--name">
                  anys
                </div>

                <div class="sd-sim-input-item__particle sd-sim-input-item__particle--years">
                  <div class="sd-input-bg">
                    <input class="sd-input"
                      placeholder="anys"
                      v-model="stUser.mortageSimValues.years"
                      @update:modelValue="totalValue"
                      type="number" />
                  </div>
                </div>
              </div>

              <div class="sd-sim-project-input-item">
                <div class="sd-sim-input-item__particle sd-sim-input-item__particle--name">
                  reserva
                </div>

                <div class="sd-sim-input-item__particle sd-sim-input-item__particle--reserve">
                  <div class="sd-input-bg">
                    <input class="sd-input"
                      placeholder="reserva"
                      v-model="stUser.mortageSimValues.reserve"
                      @update:modelValue="totalValue"
                      type="number" />
                  </div>
                </div>
              </div>

              <div class="sd-sim-project-input-item">
                <div class="sd-sim-input-item__particle sd-sim-input-item__particle--name">
                  recursos
                </div>

                <div class="sd-sim-input-item__particle sd-sim-input-item__particle--resources">
                  <div class="sd-input-bg">
                    <input class="sd-input"
                      placeholder="recursos"
                      v-model="stUser.mortageSimValues.ownResources"
                      @update:modelValue="totalValue"
                      type="number" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="sd-section__block" v-if="!blockSim">
            <div class="sd-quote-result">
              <span class="sd-quote-result__txt">
                Quota mensual estimada:
              </span>

              <span class="sd-quote-result__value">
                {{ Number(stUser.simResults.quote).toLocaleString('de-DE') }} €
              </span>
            </div>
          </div>

          <div class="sd-section__block" v-if="!blockSim">
            <div class="sd-sim-project-block-title">
              Previsió pagaments
            </div>

            <div class="sd-sim-project-total sd-sim-project-total--1">
              <div class="sd-sim-project-total__desc sd-sim-project-total__desc--1">
              Total
              </div>

              <div class="sd-sim-project-total__val sd-sim-project-total__val--1">
              00
              </div>
            </div>

            <div class="sd-sim-project-total sd-sim-project-total--1">
              <div class="sd-sim-project-total__desc sd-sim-project-total__desc--1">
              Reserva
              </div>

              <div class="sd-sim-project-total__val sd-sim-project-total__val--1">
              00
              </div>
            </div>

            <div class="sd-sim-project-total sd-sim-project-total--1">
              <div class="sd-sim-project-total__desc sd-sim-project-total__desc--1">
              Arres 1/2 (10% - res)
              </div>

              <div class="sd-sim-project-total__val sd-sim-project-total__val--1">
              00
              </div>
            </div>

            <div class="sd-sim-project-total sd-sim-project-total--1">
              <div class="sd-sim-project-total__desc sd-sim-project-total__desc--1">
              Arres 2/2 (10%)
              </div>

              <div class="sd-sim-project-total__val sd-sim-project-total__val--1">
              00
              </div>
            </div>

            <div class="sd-sim-project-total sd-sim-project-total--1">
              <div class="sd-sim-project-total__desc sd-sim-project-total__desc--1">
              A l'escripturar
              </div>

              <div class="sd-sim-project-total__val sd-sim-project-total__val--1">
              00
              </div>
            </div>
            </div>

            <div class="sd-section__block" v-if="!blockSim">
            <div class="sd-sim-project-block-title">
              Detall despeses
            </div>

            <div class="sd-sim-project-block-sub-title">
              despeses de l’escriptura de compra
            </div>

            <div class="sd-sim-project-total sd-sim-project-total--1">
              <div class="sd-sim-project-total__desc sd-sim-project-total__desc--1">
              Total
              </div>

              <div class="sd-sim-project-total__val sd-sim-project-total__val--1">
              00
              </div>
            </div>

            <div class="sd-sim-project-total sd-sim-project-total--1">
              <div class="sd-sim-project-total__desc sd-sim-project-total__desc--1">
              AJD
              </div>

              <div class="sd-sim-project-total__val sd-sim-project-total__val--1">
              00
              </div>
            </div>

            <div class="sd-sim-project-total sd-sim-project-total--1">
              <div class="sd-sim-project-total__desc sd-sim-project-total__desc--1">
              Notaria
              </div>

              <div class="sd-sim-project-total__val sd-sim-project-total__val--1">
              00
              </div>
            </div>

            <div class="sd-sim-project-total sd-sim-project-total--1">
              <div class="sd-sim-project-total__desc sd-sim-project-total__desc--1">
              Registre
              </div>

              <div class="sd-sim-project-total__val sd-sim-project-total__val--1">
              00
              </div>
            </div>

            <div class="sd-sim-project-total sd-sim-project-total--1">
              <div class="sd-sim-project-total__desc sd-sim-project-total__desc--1">
              Gestoria
              </div>

              <div class="sd-sim-project-total__val sd-sim-project-total__val--1">
              00
              </div>
            </div>

            <div class="sd-sim-project-total sd-sim-project-total--1">
              <div class="sd-sim-project-total__desc sd-sim-project-total__desc--1">
              IVA
              </div>

              <div class="sd-sim-project-total__val sd-sim-project-total__val--1">
              00
              </div>
            </div>

            <div class="sd-sim-project-block-sub-title">
              despeses de l’escriptura de l’hipoteca
            </div>

            <div class="sd-sim-project-total sd-sim-project-total--1">
              <div class="sd-sim-project-total__desc sd-sim-project-total__desc--1">
              Total
              </div>

              <div class="sd-sim-project-total__val sd-sim-project-total__val--1">
              00
              </div>
            </div>

            <div class="sd-sim-project-total sd-sim-project-total--1">
              <div class="sd-sim-project-total__desc sd-sim-project-total__desc--1">
              AJD
              </div>

              <div class="sd-sim-project-total__val sd-sim-project-total__val--1">
              00
              </div>
            </div>

            <div class="sd-sim-project-total sd-sim-project-total--1">
              <div class="sd-sim-project-total__desc sd-sim-project-total__desc--1">
              Notaria
              </div>

              <div class="sd-sim-project-total__val sd-sim-project-total__val--1">
              00
              </div>
            </div>

            <div class="sd-sim-project-total sd-sim-project-total--1">
              <div class="sd-sim-project-total__desc sd-sim-project-total__desc--1">
              Registre
              </div>

              <div class="sd-sim-project-total__val sd-sim-project-total__val--1">
                00
              </div>
            </div>

            <div class="sd-sim-project-total sd-sim-project-total--1">
              <div class="sd-sim-project-total__desc sd-sim-project-total__desc--1">
                Gestoria
              </div>

              <div class="sd-sim-project-total__val sd-sim-project-total__val--1">
                00
              </div>
            </div>

            <div class="sd-sim-project-total sd-sim-project-total--1">
              <div class="sd-sim-project-total__desc sd-sim-project-total__desc--1">
                IVA
              </div>

              <div class="sd-sim-project-total__val sd-sim-project-total__val--1">
                00
              </div>
            </div>

            <div class="sd-sim-project-total sd-sim-project-total--1">
              <div class="sd-sim-project-total__desc sd-sim-project-total__desc--1">
                Comissió d'obertura
              </div>

              <div class="sd-sim-project-total__val sd-sim-project-total__val--1">
                00
              </div>
            </div>

            <div class="sd-sim-project-total sd-sim-project-total--1">
              <div class="sd-sim-project-total__desc sd-sim-project-total__desc--1">
                Taxació
              </div>

              <div class="sd-sim-project-total__val sd-sim-project-total__val--1">
                00
              </div>
            </div>

            <div class="sd-sim-project-total sd-sim-project-total--1">
              <div class="sd-sim-project-total__desc sd-sim-project-total__desc--1">
                Assegurances
              </div>

              <div class="sd-sim-project-total__val sd-sim-project-total__val--1">
                00
              </div>
            </div>

            <div class="sd-legal-note">
              <div class="sd-info-note sd-info-note--light">
                En cas de subrogació a l’hipoteca del promotor, el comprador s'estalvia els AJD
              </div>
            </div>
          </div>

          <div class="sd-section__block" v-if="!blockSim">
            <div class="sd-info-note">
              Aquests càlculs són aproximats i merament orientatius. Per obtenir una simulació més precisa, contacta'ns.
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style lang="scss">
  .sd-sim-project-item-list-header {
    display: grid;
    grid-template-columns:  2fr 3fr 3fr 3rem;

    font-family: $font-condensed;
    font-size: .75rem;
    line-height: .75rem;

    &__cell {
      display: flex;
      align-items: center;
      font-size: 1rem;
      line-height: 1rem;
      text-transform: uppercase;
      color: rgba($color-lightest, .75);
      min-height: 1.5rem;
      padding: .125rem .5rem calc(.125rem + 1px) .5rem;
      background-color: rgba($color-darkest, .5);

      &:nth-child(1) {
        justify-content: center;
      }

      &:nth-child(2) {
        background-color: rgba($color-darkest, .52);
        justify-content: flex-start;
      }

      &:nth-child(3) {
        background-color: rgba($color-darkest, .54);
        justify-content: flex-end;
      }

      &:nth-child(4) {
        background-color: transparent;
      }
    }
  }

  .sd-sim-project-item {
    display: grid;
    grid-template-columns:  2fr 3fr 3fr 3rem;
    font-family: $font-condensed;
    font-size: .75rem;
    line-height: .75rem;

    &:nth-child(odd) {
      .sd-sim-project-item {
        &__cell {
          &--ref {
            background-color: rgba($color-darkest, .06);

            &:hover {
              background-color: rgba($color-main, .2);
            }

            &:active {
              background-color: rgba($color-main, .4);
            }
          }

          &--name {
            background-color: rgba($color-darkest, .06);

            &:hover {
              background-color: rgba($color-main, .2);
            }

            &:active {
              background-color: rgba($color-main, .4);
            }
          }

          &--cost {
            background-color: rgba($color-darkest, .06);
          }
        }
      }
    }

    &__cell {
      position: relative;
      display: flex;
      align-items: center;
      min-height: 3rem;
      padding: .125rem .25rem;
      transition: all .2s;

      &--ref {
        flex-direction: column;
        justify-content: center;
        font-size: 1rem;
        line-height: 1rem;
        text-align: center;
        color: rgba($color-main, .75);
        background-color: rgba($color-darkest, .03);
        cursor: pointer;

        &:hover {
          color: rgba($color-main, 1);
          background-color: rgba($color-main, .2);
        }

        &:active {
          background-color: rgba($color-main, .4);
        }
      }

      &--name {
        justify-content: flex-start;
        font-weight: 600;
        color: rgba($color-main, .75);
        background-color: rgba($color-darkest, .03);
        cursor: pointer;

        &:hover {
          color: rgba($color-main, 1);
          background-color: rgba($color-main, .2);
        }

        &:active {
          background-color: rgba($color-main, .4);
        }
      }

      &--cost {
        flex-direction: column;
        justify-content: center;
        align-items: flex-end;
        font-family: $font-mono;
        background-color: rgba($color-darkest, .03);

      }

      &--button {
        padding: 0;
        background-color: transparent;
      }
    }

    &__cell-item {
      display: flex;
      align-items: center;

      &--desc {
        color: rgba($color-darkest, .3);
        text-align: right;
        padding-right: .3rem;
      }

      &--val {
        text-align: right;
      }

      &--tax {
        display: grid;
        grid-template-columns: 1fr 1fr;
      }

      &--flag {
        font-weight: 700;
        font-size: .75rem;
        line-height: .75rem;
        text-transform: uppercase;
        color: rgba($color-darkest, .5);
      }
    }

    &__cell-item-particle {
        text-align: right;
        display: flex;

      &--val {
        align-items: flex-end;
        color: rgba($color-darkest, .7);
        min-height: 1.5rem;
        padding-bottom: .125rem;
      }

      &--tax-txt {
        justify-content: flex-end;
        color: rgba($color-darkest, .4);
        min-height: 1.5rem;
        padding-right: .25rem;
        padding-top: .125rem;
      }

      &--tax-val {
        color: rgba($color-darkest, .4);
        min-height: 1.5rem;
        padding-top: .125rem;
      }
    }
  }

  .sd-txt-msg {
    padding: 1.5rem;
    margin-top: 1.5rem;
    background-color: rgba($color-alert, .1);

    p {
      font-family: $font-condensed;
      font-weight: 300;
      font-size: 1rem;
      line-height: 1.1rem;
    }
  }

  .sd-sim-project-total {
    display: grid;
    grid-template-columns: 2fr 3fr 3fr 3rem;
    align-items: stretch;
    font-size: .75rem;
    line-height: .75rem;
    text-align: right;
    min-height: 1.5rem;

    &--1 {
      grid-template-columns: 5fr 3fr 3rem;
    }

    &__desc {
      grid-column: 2;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      padding: .25rem;

      &--1 {
        grid-column: 1;
      }

      &--total {
        font-weight: 700;
        color: rgba($color-darkest, .8);
        text-transform: uppercase;
      }
    }

    &__val {
      grid-column: 3;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      padding: .25rem;

      &--1 {
        grid-column: 2;
      }

      &--total {
        font-weight: 700;
        color: rgba($color-darkest, .8);
        background-color: rgba($color-darkest, .13);
      }
    }
  }

  .sd-sim-project-block-title {
    display: flex;
    align-items: center;
    font-family: $font-semi-condensed;
    font-weight: 500;
    min-height: 1.5rem;
    padding: .25rem 1.5rem;
    margin-top: 1.5rem;
    margin-right: 3rem;
    background-color: rgba($color-darkest, .03);
  }

  .sd-sim-project-block-sub-title {
    display: flex;
    align-items: center;
    font-family: $font-semi-condensed;
    min-height: 1.5rem;
    padding: .25rem 1.5rem;
    margin-top: 1.5rem;
    margin-right: 3rem;
  }

  .sd-sim-project-input-list {
    display: flex;

    .sd-input {
      text-align: right;

      &::placeholder {
        text-align: right;
      }
    }
  }

  .sd-sim-input-item {
    &__particle {
      &--name {
        display: flex;
        justify-content: flex-end;
        font-family: $font-condensed;
        padding: .25rem;
      }

      &--years {
        width: 3rem;
      }

      &--rate {
        width: 3rem;
      }

      &--reserve {
        width: 6rem;
      }

      &--resources {
        width: 6rem;
      }
    }
  }

  .sd-quote-result {
    display: flex;
    align-items: stretch;
    font-family: $font-semi-condensed;
    font-weight: 500;
    font-size: 1rem;
    line-height: 1rem;
    min-height: 1.5rem;
    padding-left: 1.5rem;
    margin-top: 1.5rem;
    margin-right: 3rem;
    background-color: rgba($color-darkest, .03);

    &__value {
      display: flex;
      align-items: center;
      color: rgba($color-lightest, .85);
      padding: 0 .5rem;
      background-color: rgba($color-darkest, .6);
    }

    &__txt {
      flex: 1;
      display: flex;
      align-items: center;
      text-align: right;
      padding-right: .5rem;
    }
  }

  .sd-info-note {
    font-family: $font-condensed;
    font-size: .75rem;
    line-height: .75rem;
    text-align: right;
    color: rgba($color-lightest, .85);
    padding: .25rem 3rem;
    margin-top: 1.5rem;
    background-color: rgba($color-darkest, .6);

    &--light {
      color: rgba($color-darkest, .75);
      padding: .25rem;
      margin-right: 3rem;
      background-color: rgba($color-darkest, .03);
    }
  }
</style>