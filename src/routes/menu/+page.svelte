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
            </div>
    
            <a class="btn" href="/menu/image-viewer/vlu9igkgnm7oin6">View the diary</a>

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
            </div>
            <a class="btn" href="/menu/audio">Listen to the interviews</a>
        </div>

        
        
    </div>
</div>

<div class="nav-bottom">
    <a href="/" class="btn-bottom" >EXIT</a>
</div>


<style>

    .nav-bottom {
        width: 100%;
        position: absolute;
        bottom: 0;
        left: 0;
        /* background-color: rgb(21, 178, 71); */
        height: 70px;
        padding-left: 70px;
    }
    .menu-image-left {
        display: block;
        z-index: 2;
        position: relative;
        width: calc(90% - 70px);
        margin-left: 70px;
        margin-top: 20px;
        height: 490px;
        object-fit: cover;
        /* object-position: -40px 15%; */
    }

    .menu-image-right {
        display: block;
        z-index: 20;
        position: relative;
        /* width: 30px;
        height: 30px; */
        width: calc(90% - 50px);
        margin-right: 50px;
        margin-bottom: 20px;
        height: 310px;
        object-fit: cover;
        object-position: 0px 15%;
    }

a.btn{
    border: 2.5px solid rgb(255, 255, 255);
    font-size: 1.3rem;
    line-height: 0px;
    text-decoration: none;
    padding: 1.1rem 1rem;
    border-radius: 2.5rem;
    color: rgb(255, 255, 255);
    width: fit-content;
    display: block;
    background-color: unset;
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
       
    }

    .section p {
        margin-bottom: 10px;
        font-size: 1.15rem;
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

    .shg-section {
        /* background-color: yellow; */
        /* background: url('/images/menu_shg.jpg') center/cover no-repeat; */
        /* height: 100%; */
        position: relative;
        color: white;
        display: flex;
        justify-content: flex-end;
        align-items: flex-end;
        flex-direction: column;
        
    }

    .section .section-content {
        position: relative;
        z-index: 1;
        max-width: 90%;
        background-color: var(--branding-secondary-red);
        /* padding: 10px 50px 10px 100px; */
    }

    .section-right {
        padding: 25px 70px 25px 25px;
        margin-bottom: 135px;
    }

    .section-left {
        padding: 25px 25px 25px 70px;
        margin-top: 70px;
    }

    .section::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #f0dcdce7;
        backdrop-filter: saturate(30%) brightness(120%);
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

