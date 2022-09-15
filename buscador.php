<?php 
/**
 */
function WOIS($WOIS='',$Dominio){
  $stringDatoWois="";
  $Mostrar=array();
         $sock       = fsockopen($WOIS, 43);
         if(!$sock){
          $Mostrar[0]=false;
         }else{
          $Mostrar[0]=true;
          fwrite($sock, $Dominio."\r\n");
        while(!feof($sock) ){
            $stringDatoWois .= fgetss($sock,128);
        } 
          fclose($sock);
      $Mostrar[1]=$stringDatoWois;     
         } 
return $Mostrar;         
}
   $WoisNombre = array(
              '.com'   =>array('whois.crsnic.net','No match for'),//.com
              '.net'   =>array('whois.crsnic.net','No match for'),//.net
              '.org'   =>array('whois.domain.com','NOT FOUND'),//.org
              '.info'   =>array('whois.tucows.com','Domain not found'),//.info
              '.xyz'   =>array('whois.domain.com','NOT FOUND'),//.net
              '.co'    =>array('whois.nic.co','No data found'),//.co
              '.com.co'    =>array('whois.nic.co','No data found'),//.co
              '.org.co'    =>array('whois.nic.co','No data found'),//.co
              '.pe'    =>array('whois.nic.pe','No Object Found'));//.pe
         $NombreDominio   =empty($_POST['Nomb']) ? false :  $_POST['Nomb'];
         $ExtesionDominio =empty($_POST['Ext'])  ? false :  $_POST['Ext'];//.com
         $PriceExtesion =empty($_POST['Price'])  ? false :  $_POST['price'];
         $incremento       =empty($_POST['Incremento']) ? 0 :  $_POST['Incremento'];
    if(strlen($NombreDominio)>0){
      $stringParser="";
       $NombreDominio   = preg_replace(array(
        '/www./','/http:\//','/\//','/.com/',
        '/.co/','/.com.co/','/edu.co/',
        '/.org.co/','/.net/','/.co/',
        '/.org/','/.pe/'), '', $NombreDominio);

       foreach ($WoisNombre as $key => $value) {
          if($key==$ExtesionDominio){
            if (WOIS($value[0],$NombreDominio.$ExtesionDominio.$PriceExtesion)[0]==true){
                  $DatoSWois= WOIS($value[0],$NombreDominio.$ExtesionDominio.$PriceExtesion)[1];
                  $Disponible='<div class="alert alert-success alert-dismissible" style="margin-top:0px;" role="alert">
                          <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                           <span>Dominio Disponible <strong> <i class="fa fa-globe"></i> &nbsp;&nbsp;( '.$NombreDominio.$ExtesionDominio.$PriceExtesion.' )</strong>&nbsp;&nbsp;&nbsp; Con el <strong> 30% </strong> Des.</span>&nbsp;&nbsp;&nbsp;
                        <a class="btn btn-success" role="button"data-toggle"<a href="https://my.businessasesores.com.co/order.php?step=1&productGroup=2" 
                        <strong>Registrar<strong><i class="fas fa-shopping-cart"></i></button> </a> 

                        </div>';
                  
                  $NoDisponible='<div class="alert alert-danger alert-dismissible" role="alert" style="margin-top:20px;">
                          <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>                 
                           <span>El dominio <strong>'.$NombreDominio.$ExtesionDominio.'</strong> <i class="fa fa-globe"></i> &nbsp;&nbsp;&nbsp;&nbsp;  Esta Registrado <strong> NO Disponible.</strong></span>
                           <a class="btn btn-danger" role="button" data-toggle="collapse" href="#collapseExample'.$incremento .'" aria-expanded="false" aria-controls="collapseExample'.$incremento .'">autor registrante
                            </a>
                               <div class="collapsing" id="collapseExample'.$incremento .'">
                                  <div class="well">
                                   <pre>'.WOIS($value[0],$NombreDominio.$ExtesionDominio)[1].'</pre>
                                  </div>
                                </div>
                        </div>'; 
                       //Quitamos algunos caracteres
                       //del servidor WHOIS Boliviano    
                      if($key==".bo"){
                        $DatoSWois=str_replace(array("¥r¥n", "¥n", "¥r"), '', $DatoSWois);
                         if($DatoSWois==$value[1]){
                           echo $Disponible;
                        }else{
                            echo $NoDisponible; 
                        }
                      }else{
                        //Buscamos 
                        if (preg_match("/".$value[1]."/i",$DatoSWois)){
                            echo $Disponible ;
                          }else{
                            echo $NoDisponible; 
                          }
                      }
               }else{
               }
          }
        }     
     }
 ?>