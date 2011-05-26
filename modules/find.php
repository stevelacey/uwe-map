        <navigation height="44px"></navigation>
        <panel id="find" title="Find" icon="42-photos.png">
          <page id="list">
            <div data-role="header">
              <h1>Points of Interest</h1>
            </div>

            <nav data-role="content">
              <ul data-role="listview">
                <li class="arrow"><a href="#bank" class="bank">Bank</a></li>
                <li class="arrow"><a href="#bars" class="bar">Bars</a></li>
                <li class="arrow"><a href="#blocks" class="block">Blocks</a></li>
                <li class="arrow"><a href="#cafes" class="cafe">Caf&eacute;s</a></li>
                <li class="arrow"><a href="#car-parks" class="car-park">Car Parks</a></li>
                <li class="arrow"><a href="#cash" class="cash">Cash Point</a></li>
                <li class="arrow"><a href="#coffee" class="coffee">Coffee</a></li>
                <li class="arrow"><a href="#supermarkets" class="supermarket">Supermarkets</a></li>
              </ul>
            </nav>
          </page>
          
          <page id="blocks">
            <div data-role="header">
              <h1>Blocks</h1>
            </div>
            
            <nav data-role="content">
              <ul data-role="listview">
                <?php foreach($blocks->poi as $block) : ?>
                  <li class="arrow"><a href="#<?php echo $block->icon ?>" class="block-<?php echo $block->icon ?>"><?php echo $block->title ?></a></li>
                <?php endforeach ?>
              </ul>
            </nav>
          </page>
          
          <page id="car-parks">
            <div data-role="header">
              <h1>Car Parks</h1>
            </div>
            
            <nav data-role="content">
              <ul data-role="listview">
                <?php foreach($car_parks->poi as $car_park) : ?>
                  <?php if(isset($car_park->icon)) : ?>
                    <li class="arrow"><a href="#<?php echo $car_park->icon ?>" class="car-park-<?php echo $car_park->icon ?>"><?php echo $car_park->title ?></a></li>
                  <?php endif ?>
                <?php endforeach ?>
              </ul>
            </nav>
          </page>
        </panel>