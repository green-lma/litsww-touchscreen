<script>
    import { goto } from '$app/navigation';
</script>
<div class="wrapper">
    <div class="section diary-section">
        <div class="section-content section-left">
            <div class="textblock">
                <h2>Percy Home's War Diary…a London record</h2> 
                <p>Percy Home, artist and designer, kept this diary when living at 11 Onslow Gardens, South Kensington, in 1944. It has the form of a scrapbook and includes pencil, pen and watercolour drawings and newspaper clippings that record events from that year. It gives us a vivid portrayal of the experience of living in a city at war.</p>
                <p>The original diary is on display in one of the exhibition cases, but here you can browse a fully digitised version. Percy Home's War Diary…a London record, 1944.</p>
                <p>CLC/521/MS21599</p>
                <a class="btn" href="/menu/image-viewer/vlu9igkgnm7oin6">View the diary</a>
            </div>
    
            

        </div>
        <!-- <img class="menu-image-left" src="/images/screensaver/rotator3.webp" alt=""> -->
        <img class="menu-image-left" src="/images/screensaver/rotator1.webp" alt="">
        
    </div>
    <div class="section shg-section">
        <img class="menu-image-right" src="/images/menu_lewis.jpg" alt="">
        
        <div class="section-content section-right">
            <div class="textblock">
                <h2>Samuel Lewis Housing Trust Remembered</h2>
                <p>The Samuel Lewis Housing Trust is a charitable housing association formed in 1901 and one of the largest providers of rented accommodation in south-east England.</p>
                <p>To celebrate the centenary of the Samuel Lewis Housing Trust, an oral history project was begun in 1999, funded by the Southern Housing Foundation. The aim of the project was 'to celebrate those lives, past and present, reflecting the changes that the last century has brought, preserving memories, photographs, documents and anything tenants feel would be of interest to their fellow tenants and others in their community'.</p>
                <p>Tenants spoke of childhood, starting work, building homes, and navigating both joyful and challenging times. Here, you can listen to a selection of interviews that recount life during the Second World War, from soldiers on the frontlines to civilians on the home front. You can listen to the full interviews in our Mediatheque.</p>
                <p>Edited selection of extracts from interviews and reminiscences of tenants of the Housing Trust, from the Through Different Eyes oral history project, 1999-2001.</p>
                <a class="btn" href="/menu/audio">Listen to the interviews</a>
            </div>
            
        </div>

        
        
    </div>
</div>

<div class="nav-bottom">
   
    <button onclick={() => {goto('/')}}><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M200-120q-33 0-56.5-23.5T120-200v-160h80v160h560v-560H200v160h-80v-160q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm220-160-56-58 102-102H120v-80h346L364-622l56-58 200 200-200 200Z"/></svg>Close and exit</button>
</div>


<style>

    .nav-bottom {
        width: 100%;
        position: absolute;
        bottom: 0;
        left: 0;
        z-index: 99;
        height: 70px;
        padding-left: 30px;
        width: fit-content;
    }
    .nav-bottom button {
    margin: 5px;

    background-color: var(--branding-secondary-red);
    color: white;
    text-transform: uppercase;
    font-weight: 600;
    border: 2px solid white;
    border-radius: 15px;
    font-size: 1.1rem;
    padding: 8px;
    display: flex;
    gap: 0.2rem;
    }

.nav-bottom svg {
    fill: white;
}
    
    .menu-image-left {
        display: block;
        z-index: 11;
        position: relative;
        width: 100%;
        /* margin-left: 70px; */
        /* margin-top: 20px; */
        height: 100%;
        object-fit: cover;
       
        /* object-position: -40px 15%; */
    }

    .menu-image-right {
        display: block;
        z-index: 10;
        position: relative;
        /* width: 30px;
        height: 30px; */
        /* width: calc(90% - 50px);
        margin-right: 50px;
        margin-bottom: 20px; */
        height: 100%;
        object-fit: cover;
        object-position: 73px -25px;
        scale: 1.2;
    }

a.btn{
    border: 2.5px solid rgb(255, 255, 255);
    font-size: 1.3rem;
    line-height: 0px;
    text-decoration: none;
    padding: 1.1rem 1rem;
    border-radius: 2.5rem;
    color: var(--branding-secondary-red);
    width: fit-content;
    display: block;
    background-color: rgb(255, 255, 255);
    margin-top: 30px;
  }

  a.btn-bottom{
    
    margin-top: 10px;
    border: 2.5px solid rgb(255, 255, 255);
    font-size: 1.3rem;
    line-height: 0px;
    text-decoration: none;
    padding: 1.1rem 1rem;
    border-radius: 2.5rem;
    color: rgb(255, 255, 255);
    width: fit-content;
    display: block;
    background-color: black;
   
  }

  a.btn:hover {
    color: var(--branding-secondary-red);
    background-color: rgb(255, 255, 255);
  }

    .textblock {
        /* display: flex;
        flex-direction: column; */
        /* height: 100%; */
       

    }
    .wrapper {
        display: grid;
        grid-template-columns: 1fr 1fr;
        height: 100vh;
        background: url('/images/bombdamagemap.webp');
        overflow: hidden;
    }

    .section {
        /* padding: 100px; */
        position: relative;
        display: grid;
        grid-template-rows: 1fr 1fr;
       
    }

    .section p {
        margin-bottom: 10px;
        font-size: 1.2rem;
    }

   .section h2 {
    /* text-transform: uppercase; */
    letter-spacing: 0.2rem;
    font-weight: 450;
    margin-bottom: 15px;
   }

    .diary-section {
        /* background-color: var(--branding-secondary-red-tint); */
        /* background-color: yellow; */
        /* background: url('/images/menu_diary.jpg') center/cover no-repeat; */
        /* height: 100%; */
        position: relative;
        color: white;
    }

    /* .shg-section {
        
        position: relative;
        color: white;
        display: flex;
        justify-content: flex-end;
        align-items: flex-end;
        flex-direction: column;
        
    } */

    .section .section-content {
        position: relative;
        z-index: 99;
        /* max-width: 90%; */
        height: 100%;
        background-color: var(--branding-secondary-red);
        color: white;
        padding: 30px;
        display: flex;
        align-items: center;
        
    }

   

    .section::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #f0dcdcf0;
        /* backdrop-filter: saturate(30%) brightness(120%); */
    }

    a.nav-btn {
        border: 2px solid black;
        background-color: white;
        text-decoration: none;
        display: block;
        padding: 5px;
        border-radius: 15px;
        margin: 5px;
        width: fit-content;
    }

    a.nav-btn:visited {
        color: black;
    }

</style>

