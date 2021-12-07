<template>
  <div class='checkout-address'>
    <div class='text'>
      <div v-if='!defaultAddress' class='none'>您需要先添加收货地址才可提交订单。</div>
      <ul v-else>
        <li><span>收<i />货<i />人：</span>{{ defaultAddress.receiver }}</li>
        <li><span>联系方式：</span>{{ defaultAddress.contact }}</li>
        <li><span>收货地址：</span>{{ defaultAddress.fullLocation }}</li>
      </ul>
      <a href='javascript:;' @click='handleOpenAddDialog("edit")'>修改地址</a>
    </div>
    <div class='action'>
      <CButton class='btn' @click='handleOpenListDialog'>切换地址</CButton>
      <CButton class='btn' @click='handleOpenAddDialog("add")'>添加地址</CButton>
    </div>
  </div>
  <!--  收货地址列表-->
  <c-dialog
    v-model='listVisible'
    title='地址列表'
    @confirm='handleConfirmListDialog'
    @cancel='handleCancelListDialog'
  >
    <div class='dialog-list'>
      <div class='text dialog-list-item'
           :class='{active:calcDefaultAddress?.id === item.id}'
           v-for='item in list'
           @click='handleSelectedDefaultAddress(item)'
           :key='item.id'>
        <ul>
          <li><span>收<i />货<i />人：</span>{{ item.receiver }}</li>
          <li><span>联系方式：</span>{{ item.contact }}</li>
          <li><span>收货地址：</span>{{ item.address }}</li>
        </ul>
      </div>
    </div>
  </c-dialog>
  <!--  添加地址-->
  <c-dialog
    v-model='addVisible'
    title='添加地址'
    @confirm='handleAddConfirmDialog'
    @cancel='handleAddCancelDialog'>
    <div class='address-edit'>
      <div class='xtx-form'>
        <div class='c-form-item'>
          <div class='label'>收货人：</div>
          <div class='field'>
            <input class='input' v-model='addressFrom.receiver' placeholder='请输入收货人' />
          </div>
        </div>
        <div class='c-form-item'>
          <div class='label'>手机号：</div>
          <div class='field'>
            <input class='input' v-model='addressFrom.contact' placeholder='请输入手机号' />
          </div>
        </div>
        <div class='c-form-item'>
          <div class='label'>地区：</div>
          <div class='field'>
            <CCity :fullLocation='addressFrom.fullLocation || "请选择收货地址"' @change='handleAddressChange' />
          </div>
        </div>
        <div class='c-form-item'>
          <div class='label'>详细地址：</div>
          <div class='field'>
            <input class='input' placeholder='请输入详细地址' v-model='addressFrom.address' />
          </div>
        </div>
        <div class='c-form-item'>
          <div class='label'>邮政编码：</div>
          <div class='field'>
            <input class='input' v-model='addressFrom.postalCode' placeholder='请输入邮政编码' />
          </div>
        </div>
        <div class='c-form-item'>
          <div class='label'>地址标签：</div>
          <div class='field'>
            <input class='input' v-model='addressFrom.addressTags' placeholder='请输入地址标签，逗号分隔' />
          </div>
        </div>
      </div>
    </div>
  </c-dialog>
</template>
<script>
import { insertAddressApi, updateAddressApi } from '@/api/address'
import { computed, inject, reactive, ref } from 'vue'
import CDialog from '@/components/library/c-dialog'

export default {
  name: 'CheckoutAddress',
  components: { CDialog },
  setup() {
    // data
    const orderInfo = inject('order')
    const getOrderInfo = inject('getOrderInfo')
    const list = computed(() => orderInfo.value?.userAddresses)
    const listVisible = ref(false)
    const addVisible = ref(false)
    const actionType = ref('')
    // - 默认地址
    const defaultAddress = computed(() => list.value?.find(it => it.isDefault === 0))
    // - 当前dialog选中的地址
    const selectedAddress = ref(null)
    // - 计算当前dialog组件应该显示什么地址
    const calcDefaultAddress = computed(() => selectedAddress.value ? selectedAddress.value : defaultAddress.value)
    // - 购物车form
    const addressFrom = reactive({
      receiver: '', // 收货人姓名
      contact: '', // 联系方式
      provinceCode: '', // 所在省份编码
      cityCode: '', // 所在城市编码
      countyCode: '', // 所在区/县编码
      address: '', // 详细地址
      postalCode: '', // 邮政编码
      addressTags: '', // 地址标签,以英文逗号分割
      isDefault: '' // 是否为默认，0为是，1为否
    })

    // 事件方法
    // 地址列表dialog - 打开
    const handleOpenListDialog = () => {
      selectedAddress.value = null
      listVisible.value = true
    }
    // 地址列表dialog - 选中某个地址
    const handleSelectedDefaultAddress = (item) => {
      selectedAddress.value = item
    }
    // 地址列表dialog - 确认
    const handleConfirmListDialog = async () => {
      // 如果当前选中了地址, 并且与默认地址不一致, 才可以请求更新地址
      try {
        await updateAddressList()
        await getAddressList()
      } catch (e) {
      }
    }
    // 地址列表dialog- 取消
    const handleCancelListDialog = () => {
      selectedAddress.value = null
    }
    // 添加/编辑地址dialog - 打开
    const handleOpenAddDialog = (type) => {
      actionType.value = type
      if (type === 'edit') {
        Object.assign(addressFrom, JSON.parse(JSON.stringify(defaultAddress.value)))
      }
      addVisible.value = true
    }
    // 添加地址dialog - 确认
    const handleAddConfirmDialog = async () => {
      if (actionType.value === 'add') {
        // 添加收货地址
        await insertAddress()
      } else {
        // 编辑收货地址
        await editAddress()
      }
      // 刷新地址列表
      await getAddressList()
      actionType.value = ''
      resetAddressForm()
    }
    // 添加地址dialog - 取消
    const handleAddCancelDialog = () => {
      actionType.value = ''
      resetAddressForm()
    }
    // 更改省市区
    const handleAddressChange = (data) => {
      addressFrom.provinceCode = data.provinceCode
      addressFrom.cityCode = data.cityCode
      addressFrom.countyCode = data.countyCode
    }

    // api方法
    /**
     * 获取收货地址列表
     * @returns {Promise<void>}
     */
    async function getAddressList() {
      getOrderInfo()
    }

    // 设置当前默认的收货地址
    async function updateAddressList() {
      const fetchArr = []
      if (selectedAddress.value && selectedAddress.value !== defaultAddress.value) {
        const listCopy = JSON.parse(JSON.stringify(list.value))
        listCopy.forEach(item => {
          item.isDefault = item.id === selectedAddress.value.id ? 0 : 1
          fetchArr.push(updateAddressApi(item))
        })
      }
      return new Promise((resolve, reject) => {
        if (fetchArr.length > 0) {
          Promise.all(fetchArr).then(resolve)
        } else {
          // eslint-disable-next-line prefer-promise-reject-errors
          reject()
        }
      })
    }

    // 添加收货地址
    async function insertAddress() {
      return insertAddressApi(JSON.parse(JSON.stringify(addressFrom)))
    }

    // 编辑收货地址
    async function editAddress() {
      return updateAddressApi(JSON.parse(JSON.stringify(addressFrom)))
    }

    // 重置addressForm
    function resetAddressForm() {
      for (const key in addressFrom) {
        addressFrom[key] = ''
      }
    }

    return {
      // 切换地址
      defaultAddress,
      list,
      listVisible,
      calcDefaultAddress,
      handleOpenListDialog,
      handleConfirmListDialog,
      handleCancelListDialog,
      handleSelectedDefaultAddress,
      // 添加地址
      addressFrom: addressFrom,
      addVisible,
      handleAddCancelDialog,
      handleAddConfirmDialog,
      handleOpenAddDialog,
      handleAddressChange
    }
  }
}
</script>
<style scoped lang='less'>
.checkout-address {
  border: 1px solid #f5f5f5;
  display: flex;
  align-items: center;

  .text {
    flex: 1;
    min-height: 90px;
    display: flex;
    align-items: center;

    .none {
      line-height: 90px;
      color: #999;
      text-align: center;
      width: 100%;
    }

    > ul {
      flex: 1;
      padding: 20px;

      li {
        line-height: 30px;

        span {
          color: #999;
          margin-right: 5px;

          > i {
            width: 0.5em;
            display: inline-block;
          }
        }
      }
    }

    > a {
      color: @mainColor;
      width: 160px;
      text-align: center;
      height: 90px;
      line-height: 90px;
      border-right: 1px solid #f5f5f5;
    }
  }

  .action {
    width: 420px;
    text-align: center;

    .btn {
      width: 140px;
      height: 46px;
      line-height: 44px;
      font-size: 14px;

      &:first-child {
        margin-right: 10px;
      }
    }
  }
}

// dialog
.dialog-list {
  min-height: 90px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  height: 240px;
  overflow: auto;

  &-item {
    flex: 100%;
    border: 1px solid #f5f5f5;
    margin-bottom: 10px;
    cursor: pointer;

    &.active, &:hover {
      border-color: @mainColor;
      background: lighten(@mainColor, 50%);
    }

    > ul {
      padding: 10px;
      font-size: 14px;
      line-height: 30px;
    }
  }
}
</style>
