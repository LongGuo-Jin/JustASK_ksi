<?php

/* @author    2codeThemes
*  @package   WPQA/templates/profile
*  @version   1.0
*/

if ( ! defined( 'ABSPATH' ) ) {
   exit; // Exit if accessed directly
}

$author_name           = esc_attr(get_query_var("author_name"));
$wpqa_user_id          = esc_attr(get_query_var(apply_filters('wpqa_user_id','wpqa_user_id')));
$author_box            = wpqa_options("author_box");
$active_points         = wpqa_options('active_points');
$user_profile_pages    = wpqa_options("user_profile_pages");
$user_stats            = wpqa_options('user_stats');
$user_stats_2          = wpqa_options('user_stats_2');
$show_point_favorite   = get_user_meta($wpqa_user_id,"show_point_favorite",true);
$ask_question_to_users = wpqa_options("ask_question_to_users");
$pay_ask               = wpqa_options("pay_ask");
if ($ask_question_to_users == "on") {
	/* asked_questions */
	$asked_questions = wpqa_count_asked_question($wpqa_user_id,"=");
}

include wpqa_get_template("head-tabs.php","profile/");?>

<?php if (!wpqa_user_title()) {?>
	<div class="user-area-content">
		<?php if ($author_box == "on") {
			$cover_image = wpqa_options("cover_image");
			echo wpqa_author($wpqa_user_id,"advanced",wpqa_is_user_owner(),"","","user-area-head",($cover_image == "on"?"cover":""));
		}
		
		/* following */
		$following_me  = get_user_meta($wpqa_user_id,"following_me",true);
		$following_me  = (is_array($following_me) && !empty($following_me)?get_users(array('fields' => 'ID','include' => $following_me,'orderby' => 'registered')):array());
		$following_you = get_user_meta($wpqa_user_id,"following_you",true);
		$following_you = (is_array($following_you) && !empty($following_you)?get_users(array('fields' => 'ID','include' => $following_you,'orderby' => 'registered')):array());
		
		wpqa_get_user_stats($wpqa_user_id,$user_stats,$active_points,$show_point_favorite);
		
		$size = 29;
		if ((isset($user_stats_2["followers"]) && $user_stats_2["followers"] == "followers") || (isset($user_stats_2["i_follow"]) && $user_stats_2["i_follow"] == "i_follow")) {
			if (count($user_stats_2) == 1) {
				$column_follow = "col12";
			}else {
				$column_follow = "col6";
			}?>
			<div class="user-follower">
				<ul class="row">
					<?php if (isset($user_stats_2["followers"]) && $user_stats_2["followers"] == "followers") {?>
						<li class="col <?php echo esc_attr($column_follow)?> user-followers">
							<div>
								<a href="<?php echo esc_url(wpqa_get_profile_permalink($wpqa_user_id,"followers"))?>"></a>
								<h4><i class="icon-users"></i><?php esc_html_e("Followers","wpqa")?></h4>
								<div>
									<?php $followers = $last_followers = 0;
									if (isset($following_you) && is_array($following_you)) {
										$followers = count($following_you);
									}
									
									if ($followers > 0) {
										$last_followers = $followers-4;
										if (isset($following_you) && is_array($following_you)) {
											$sliced_array = array_slice($following_you,0,4);
											foreach ($sliced_array as $key => $value) {
												echo wpqa_get_user_avatar(array("user_id" => $value,"size" => $size));
											}
										}
									}?>
									<span>
										<?php if ($last_followers > 0) {?>
											<span>+ <?php echo wpqa_count_number($last_followers)?></span> <?php echo _n("Follower","Followers",$last_followers,"wpqa")?>
										<?php }else if ($followers == 0) {
											esc_html_e("User doesn't have any followers yet.","wpqa");
										}?>
									</span>
								</div>
							</div>
						</li>
					<?php }
					if (isset($user_stats_2["i_follow"]) && $user_stats_2["i_follow"] == "i_follow") {?>
						<li class="col <?php echo esc_attr($column_follow)?> user-following">
							<div>
								<a href="<?php echo esc_url(wpqa_get_profile_permalink($wpqa_user_id,"following"))?>"></a>
								<h4><i class="icon-users"></i><?php esc_html_e("Following","wpqa")?></h4>
								<div>
									<?php $following = $last_following = 0;
									if (isset($following_me) && is_array($following_me)) {
										$following = count($following_me);
									}
									if ($following > 0) {
										$last_following = $following-4;
										if (isset($following_me) && is_array($following_me)) {
											$sliced_array = array_slice($following_me,0,4);
											foreach ($sliced_array as $key => $value) {
												echo wpqa_get_user_avatar(array("user_id" => $value,"size" => $size));
											}
										}
									}?>
									<span>
										<?php if ($last_following > 0) {?>
											<span>+ <?php echo wpqa_count_number($last_following)?></span> <?php echo _n("Member","Members",$last_following,"wpqa")?>
										<?php }else if ($following == 0) {
											esc_html_e("User doesn't follow anyone.","wpqa");
										}?>
									</span>
								</div>
							</div>
						</li>
					<?php }?>
				</ul>
			</div><!-- End user-follower -->
		<?php }?>
	</div><!-- End user-area-content -->
	<?php
		// echo '<p>'.home_url( $wp->request ).'</p>';
		$cur_site_url = $_SERVER['REQUEST_URI'];
		$cur_last = end(explode("/",$cur_site_url,-1));
		// echo '<p>'.$cur_last.'</p>';
		
		$user_id              = get_current_user_id();
		$user_role = get_the_author_meta("userrole",$user_id);
		if($cur_last == strtolower(get_the_author_meta("nickname",$user_id))){
			if($user_role == "student"){
				echo '<section id="profile_search" >';
				echo '<h2 class="widget-title"><i class="icon-folder"></i>Search Your Parent Profile</h2>';
				echo '<label>Your Parent First Name<span class="required">*</span></label> <input class="required-item" style="width:100%" name="first_name" id="sfirst_name" type="text" value=""> </i><br>';
				echo '<label>Your Parent Last Name<span class="required">*</span></label> <input class="required-item" style="width:100%" name="last_name" id="slast_name" type="text" value=""> </i><br>';
				echo '<label>Your Parent Nric<span class="required">*</span></label> <input class="required-item" style="width:100%" name="nric" id="snric" type="text" value=""> </i><br>';
				echo '<div style="text-align: center;"><a id="related_search" style="margin: 5px; width:48%; text-align:center;" class="button-default profile-button">Link</a></div>';
				echo '</section>';
			}
			else if($user_role == "parent")
			{
				echo '<section id="profile_search" >';
				echo '<h2 class="widget-title"><i class="icon-folder"></i>Search Your Chidren Profile</h2>';
				echo '<label>Your Chidren First Name<span class="required">*</span></label> <input class="required-item" style="width:100%" name="first_name" id="sfirst_name" type="text" value=""> </i><br>';
				echo '<label>Your Children Last Name<span class="required">*</span></label> <input class="required-item" style="width:100%" name="last_name" id="slast_name" type="text" value=""> </i><br>';
				echo '<label>Your Children Nric<span class="required">*</span></label> <input class="required-item" style="width:100%" name="nric" id="snric" type="text" value=""> </i><br>';
				echo '<div style="text-align: center;"><a id="related_search" style="margin: 5px; width: 48%; text-align:center;" class="button-default profile-button">Link</a></div>';
				echo '</section>';
			}
		}
	?>
<?php }

do_action("wpqa_after_head_content_profile",$wpqa_user_id);?>