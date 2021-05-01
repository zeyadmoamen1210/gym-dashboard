<template>
  <div class="recent-history">








    <div class="container">
      <div class="recent-history-head">
        <div>
          <h4 class="head">Recent Invoices</h4>
        </div>
        <div>
          <div class="form-group">
             <vs-input state="primary" primary v-model="search" placeholder="Search ..">
                <template #icon>
                  <img style="width:15px" src="@/assets/loupe.svg" alt="">
                </template>
              </vs-input>
          </div>
        </div>
      </div>
    <vs-table>
        <template #thead>
          <vs-tr>
            <vs-th>
              Invoice No.
            </vs-th>
            <vs-th>
              Issued On
            </vs-th>
            <vs-th>
              Due On
            </vs-th>
            <vs-th>
              Client
            </vs-th>
            <vs-th>
              Amount
            </vs-th>
            <vs-th>
              Actions
            </vs-th>
          </vs-tr>
        </template>
        <template #tbody>
          <vs-tr
            :key="i"
            v-for="(tr, i) in users"
            :data="tr"
          >
            <vs-td>
              {{ tr.invoiceNo }}
            </vs-td>
            <vs-td>
            {{ tr.issuedOn }}
            </vs-td>
            <vs-td>
            {{ tr.dueOn }}
            </vs-td>
            <vs-td>
            {{ tr.client }}
            </vs-td>
            <vs-td>
            {{ tr.amount }}
            </vs-td>
            
           
            <vs-td style="actions">
            <vs-button
              color="whatsapp"
              circle
              icon
              floating
            >
              <img style="width:15px" src="@/assets/dollar-symbol.svg" alt="">
            </vs-button>
            <vs-button
              color="primary"
              circle
              icon
              floating
            >
              <img style="width:15px" src="@/assets/printer.svg" alt="">
            </vs-button>

            <vs-button
              color="#ff3e4e"
              circle
              icon
              floating
            >
              <img style="width:15px" src="@/assets/delete.svg" alt="">
            </vs-button>
            </vs-td>
          </vs-tr>
        </template>
        <template #footer>
          <vs-pagination v-model="page" :length="20" />
        </template>
      </vs-table>
  </div>
  </div>
</template>
<script>
export default {
      data:() => ({
       page:1,
       payNew: {},
        
      })
    }
</script>

<style lang="scss">
.recent-history{
  padding: 15px 23px;
  .vs-table__td:last-child{
      display: flex !important;
      button{
        margin: 0 3px;
      }
    }
    .vs-table__td{
      text-align: center !important;
    }
    .vs-table__th__content{
        display: block !important;
    }
    
    .vs-table__th__content{
     font-weight: 600 !important;
     text-align: center;
   }
  .recent-history-head{
    display: flex;
    flex-wrap: wrap;
    div{
      &:first-of-type{
        flex:1;
        h4{
          padding-top:5px;
        }
      }
    }
   

    

    .head{
      color:#2C4484;
      font-weight: bold;
      margin-bottom: 15px;
      
    }

  }
  
}
</style>